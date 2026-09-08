const inject = ['remote']

const RESOURCE_REFRESH_INTERVAL = 45_000
const RESOURCE_REFRESH_THROTTLE = 8_000
const RESOURCE_REFRESH_BACKOFF = [60_000, 120_000, 240_000, 300_000]

function createRefreshPolicy({ now = () => Date.now(), interval = RESOURCE_REFRESH_INTERVAL, throttle = RESOURCE_REFRESH_THROTTLE, backoff = RESOURCE_REFRESH_BACKOFF } = {}) {
  const startedAt = new Map()
  const failures = new Map()
  return {
    shouldStart(source, automatic) {
      if (!automatic) return true
      const current = now()
      const failure = failures.get(source)
      if (failure !== undefined && failure.backoffUntil > current) return false
      const last = startedAt.get(source)
      return last === undefined || current - last >= throttle
    },
    markStarted(source) {
      startedAt.set(source, now())
    },
    markSuccess(source) {
      failures.delete(source)
    },
    markFailure(source) {
      const attempts = (failures.get(source)?.attempts ?? 0) + 1
      const wait = backoff[Math.min(attempts - 1, backoff.length - 1)]
      failures.set(source, { attempts, backoffUntil: now() + wait })
    },
    delay(source) {
      const failure = failures.get(source)
      return failure === undefined ? interval : Math.max(interval, failure.backoffUntil - now())
    },
  }
}

function createRefreshScheduler({ setTimeout: scheduleTimer, clearTimeout: cancelTimer, isVisible, getDelay, refresh }) {
  let timer = null
  let disposed = false
  const clear = () => {
    if (timer !== null) cancelTimer(timer)
    timer = null
  }
  const schedule = () => {
    clear()
    if (disposed || !isVisible()) return
    timer = scheduleTimer(() => {
      timer = null
      if (!isVisible()) return
      Promise.resolve(refresh('interval')).finally(schedule)
    }, getDelay())
  }
  return {
    start: schedule,
    stop() {
      disposed = true
      clear()
    },
    onVisibility() {
      clear()
      if (isVisible()) Promise.resolve(refresh('visibility')).finally(schedule)
    },
    onFocus() {
      if (isVisible()) {
        clear()
        Promise.resolve(refresh('focus')).finally(schedule)
      }
    },
  }
}

function resourceStateKey(source) {
  if (source === 'deepseek') return 'balance'
  if (source === 'opencode') return 'go'
  if (source === 'moonshot-cn') return 'moonshotCn'
  return source
}

function mergeResourceState(currentState, incomingState, source) {
  const current = currentState !== null && typeof currentState === 'object' ? currentState : {}
  const incoming = incomingState !== null && typeof incomingState === 'object' ? incomingState : {}
  const key = resourceStateKey(source)
  if (key === null || !Object.prototype.hasOwnProperty.call(incoming, key)) return { ...current }
  return {
    ...current,
    [key]: incoming[key],
    updatedAt: Math.max(Number(current.updatedAt) || 0, Number(incoming.updatedAt) || 0, Number(incoming[key]?.attemptedAt) || 0),
  }
}

function mergeHostState(currentState, incomingState) {
  const current = currentState !== null && typeof currentState === 'object' ? currentState : {}
  const incoming = incomingState !== null && typeof incomingState === 'object' ? incomingState : {}
  const next = { ...current }
  for (const key of Object.keys(incoming)) {
    if (key === 'updatedAt') continue
    const oldEntry = current[key]
    const newEntry = incoming[key]
    const oldAttemptedAt = Number(oldEntry?.attemptedAt) || 0
    const newAttemptedAt = Number(newEntry?.attemptedAt) || 0
    if (oldEntry === undefined || newAttemptedAt >= oldAttemptedAt) next[key] = newEntry
  }
  next.updatedAt = Math.max(Number(current.updatedAt) || 0, Number(incoming.updatedAt) || 0)
  return next
}


    async function apply(ctx) {
      installStyles()
      installSignalSettingsNavIcons(ctx)
      installSettingsLayerGuard(ctx)
      const resource = makeStore({ status: 'loading', error: null, state: null, refreshing: null })
      const analytics = makeStore({ status: 'loading', error: null, state: null, refreshing: false })
      let service

      if (ctx.remote !== undefined && typeof ctx.remote.$mount === 'function') {
        try {
          const unmount = await ctx.remote.$mount(CONTRIBUTION)
          ctx.effect(() => () => unmount(), 'dsh-signal: remote contribution')
          service = ctx.get('remote.signalResource')
        } catch (error) {
          resource.set({ status: 'error', error: error?.message ?? String(error), state: null, refreshing: null })
          analytics.set({ status: 'error', error: error?.message ?? String(error), state: null, refreshing: false })
        }
      }

      const call = async (method, args = []) => {
        if (service === undefined) throw new Error('Host 资源服务未连接')
        const result = await service[method](...args)
        if (result === null || typeof result !== 'object' || result.ok !== true) {
          throw new Error(result?.error?.message ?? `${method} RPC 失败`)
        }
        return result.value
      }

      let loading = false
      let loadingAnalytics = false
      let activeSource = null
      const refreshPolicy = createRefreshPolicy()
      const refreshingSources = new Set()
      const refreshingValue = () => refreshingSources.size === 0
        ? null
        : refreshingSources.size === 1 ? refreshingSources.values().next().value : 'all'
      const setRefreshing = (source, active) => {
        if (active) refreshingSources.add(source)
        else refreshingSources.delete(source)
        const latest = resource.getSnapshot()
        resource.set({ ...latest, refreshing: refreshingValue() })
      }
      const refreshDelay = source => {
        return refreshPolicy.delay(source)
      }
      const reload = async () => {
        if (loading || service === undefined) return
        loading = true
        const previous = resource.getSnapshot()
        if (previous.state === null) resource.set({ ...previous, status: 'loading', error: null })
        try {
          const [hostState, codex] = await Promise.all([
            call('getState'),
            activeSource === 'codex' ? readCodexResource(previous.state?.codex) : Promise.resolve(previous.state?.codex),
          ])
          const latest = resource.getSnapshot()
          const state = mergeHostState(latest.state, hostState)
          const latestCodex = latest.state?.codex
          state.codex = Number(latestCodex?.attemptedAt) > Number(codex?.attemptedAt ?? 0)
            ? latestCodex : codex ?? latestCodex ?? previous.state?.codex
          state.updatedAt = Math.max(Number(state.updatedAt) || 0, Number(state.codex?.attemptedAt) || 0)
          resource.set({ ...latest, status: 'ready', error: null, state, refreshing: refreshingValue() })
        } catch (error) {
          const latest = resource.getSnapshot()
          resource.set({ ...latest, status: 'error', error: error?.message ?? String(error), refreshing: refreshingValue() })
        } finally {
          loading = false
        }
      }

      const reloadAnalytics = async force => {
        if (loadingAnalytics || service === undefined) return
        loadingAnalytics = true
        const previous = analytics.getSnapshot()
        analytics.set({ ...previous, status: previous.state === null ? 'loading' : previous.status, error: null, refreshing: force })
        try {
          const state = await call(force ? 'refreshAnalytics' : 'getAnalytics')
          analytics.set({ status: 'ready', error: null, state, refreshing: false })
        } catch (error) {
          analytics.set({ status: 'error', error: error?.message ?? String(error), state: previous.state, refreshing: false })
        } finally {
          loadingAnalytics = false
        }
      }

      const resourceInFlight = new Map()
      const api = {
        setActiveSource(source, expected = undefined) {
          if (source === null && expected !== undefined && activeSource !== expected) return
          activeSource = source
        },
        getRefreshDelay(source) {
          return refreshDelay(source)
        },
        async refresh(source, options = undefined) {
          if (typeof source !== 'string' || source.length === 0) return
          const reason = typeof options === 'string' ? options : options?.reason ?? 'manual'
          const automatic = reason !== 'manual' && options?.force !== true
          if (resourceInFlight.has(source)) return resourceInFlight.get(source)
          if (automatic && document.visibilityState !== 'visible') return
          if (!refreshPolicy.shouldStart(source, automatic)) return
          refreshPolicy.markStarted(source)
          const task = (async () => {
            setRefreshing(source, true)
            const previous = resource.getSnapshot()
            resource.set({ ...previous, error: null, refreshing: refreshingValue() })
            try {
              if (source === 'codex') {
                try {
                  const entry = await readCodexResource(previous.state?.codex)
                  const latest = resource.getSnapshot()
                  const state = {
                    ...(latest.state ?? {}),
                    [source]: entry,
                    updatedAt: Math.max(Number(latest.state?.updatedAt) || 0, Number(entry.attemptedAt) || 0),
                  }
                  if (entry.status === 'error') refreshPolicy.markFailure(source)
                  else refreshPolicy.markSuccess(source)
                  resource.set({ ...latest, status: 'ready', error: null, state, refreshing: refreshingValue() })
                } catch (error) {
                  const latest = resource.getSnapshot()
                  refreshPolicy.markFailure(source)
                  resource.set({ ...latest, status: 'error', error: error?.message ?? String(error), refreshing: refreshingValue() })
                }
                return
              }
              if (service === undefined) return
              try {
                const hostState = await call('refreshSource', [source])
                const latest = resource.getSnapshot()
                const state = mergeResourceState(latest.state, hostState, source)
                state.codex = latest.state?.codex
                refreshPolicy.markSuccess(source)
                resource.set({ ...latest, status: 'ready', error: null, state, refreshing: refreshingValue() })
              } catch (error) {
                const latest = resource.getSnapshot()
                refreshPolicy.markFailure(source)
                resource.set({ ...latest, status: 'error', error: error?.message ?? String(error), refreshing: refreshingValue() })
              }
            } finally {
              setRefreshing(source, false)
            }
          })()
          resourceInFlight.set(source, task)
          try {
            return await task
          } finally {
            if (resourceInFlight.get(source) === task) resourceInFlight.delete(source)
          }
        },
        async refreshAnalytics() {
          await reloadAnalytics(true)
        },
        async ensureAnalytics() {
          await reloadAnalytics(false)
        },
      }

      ctx.inject(['slots', 'modelDirectories'], scope => {
        scope.slots.inject('conversation.hero.brand.mark', () => scope.slots.register({
          name: 'conversation.hero.brand.mark',
          id: 'dsh-signal-hero-mark',
        }, SignalMark))
        scope.slots.inject('settings.section', () => scope.slots.register({
          name: 'settings.section',
          id: 'dsh-signal-usage',
          order: 42,
          label: () => 'Signal 用量',
          inject: () => ({ analytics, api }),
        }, SignalUsageSettings))
        scope.slots.inject('settings.section', () => scope.slots.register({
          name: 'settings.section',
          id: 'dsh-signal-appearance',
          order: 41,
          label: () => 'Signal 外观',
          inject: () => ({}),
        }, SignalAppearanceSettings))
        scope.slots.inject('conversation.session.header.utilities', () => scope.slots.register({
          name: 'conversation.session.header.utilities',
          id: 'dsh-signal-work-explainer',
          order: 35,
          label: '模型工作说明',
          inject: sessionId => {
            const directory = scope.modelDirectories.directoryFor(sessionId)
            directory.load().catch(() => {})
            return { directory: directory.store }
          },
        }, WorkExplainer))
      })

      ctx.inject(['slots', 'modelDirectories'], scope => {
        const directories = scope.modelDirectories
        scope.slots.inject('conversation.input.dock', () => scope.slots.register({
          name: 'conversation.input.dock',
          id: 'dsh-signal-resource-rail',
          order: 1,
          inject: sessionId => {
            const directory = directories.directoryFor(sessionId)
            directory.load().catch(() => {})
            return { directory: directory.store, resource, api }
          },
        }, ResourceRail))
      })

      if (service !== undefined) {
        void reload()
        ctx.effect(() => ctx.on('connection/reset', () => {
          if (activeSource !== null) void api.refresh(activeSource)
          else void reload()
        }), 'dsh-signal: reconnect reload')
      }
    }

    exports.apply = apply
    exports.inject = inject
    return module.exports
  },
})
