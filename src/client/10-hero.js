    function installStyles() {
      // DSH may dispose a client context during theme changes before its registered slots unmount.
      // Keep one page-scoped stylesheet alive; a full page reload naturally clears it on uninstall.
      let style = document.querySelector('style[data-dsh-signal="styles"]')
      if (style === null) {
        style = document.createElement('style')
        style.dataset.dshSignal = 'styles'
        document.head.append(style)
      }
      style.textContent = CSS
    }

    function installSignalSettingsNavIcons(ctx) {
      installSignalCardMotion(ctx)
      let disposed = false
      let queued = false
      const labels = new Map([
        ['Signal 用量', 'usage'],
        ['Signal 外观', 'connections'],
      ])
      const update = () => {
        queued = false
        if (disposed) return
        for (const button of document.querySelectorAll('[role="dialog"] button')) {
          const label = button.textContent?.trim() ?? ''
          const kind = labels.get(label)
          if (kind === undefined) {
            if (button.hasAttribute('data-dsh-signal-settings-nav')) button.removeAttribute('data-dsh-signal-settings-nav')
          } else {
            button.setAttribute('data-dsh-signal-settings-nav', kind)
          }
        }
      }
      const schedule = () => {
        if (queued || disposed) return
        queued = true
        queueMicrotask(update)
      }
      const observer = new MutationObserver(schedule)
      observer.observe(document.body, { childList: true, subtree: true, characterData: true })
      update()
      ctx.effect(() => () => {
        disposed = true
        observer.disconnect()
        for (const button of document.querySelectorAll('[data-dsh-signal-settings-nav]')) button.removeAttribute('data-dsh-signal-settings-nav')
      }, 'dsh-signal: settings nav icons')
    }

    function installSettingsLayerGuard(ctx) {
      let disposed = false
      let queued = false
      let composerSeat = null
      let wasOpen = false
      let settingsTrigger = null

      const isSettingsDialog = dialog => {
        const labels = new Set([...dialog.querySelectorAll('button')]
          .map(button => button.textContent?.trim() ?? ''))
        return labels.has('通用设置') && labels.has('插件') && (labels.has('Signal 用量') || labels.has('Signal 外观'))
      }

      const findComposerSeat = () => {
        const dock = document.querySelector('[data-dsh-signal-dock]')
        let node = dock?.parentElement ?? null
        let semanticSeat = null
        while (node && node !== document.body) {
          const style = getComputedStyle(node)
          const rect = node.getBoundingClientRect()
          if (
            semanticSeat === null &&
            rect.width > 0 &&
            rect.height > 0 &&
            node.querySelector('textarea, input, [contenteditable="true"], [role="textbox"]')
          ) semanticSeat = node
          if (style.position === 'sticky' || style.position === 'fixed') return node
          node = node.parentElement
        }
        return semanticSeat
      }

      const findSettingsTrigger = () => [...document.querySelectorAll('button')].find(button =>
        button.textContent?.trim() === '设置' && button.closest('[role="dialog"]') === null) ?? null

      const update = () => {
        queued = false
        if (disposed) return
        const nextSeat = findComposerSeat()
        if (nextSeat !== composerSeat) {
          composerSeat?.removeAttribute('data-dsh-signal-composer-seat')
          composerSeat = nextSeat
          composerSeat?.setAttribute('data-dsh-signal-composer-seat', '')
        }
        const open = [...document.querySelectorAll('[role="dialog"]')].some(isSettingsDialog)
        if (open && !wasOpen) settingsTrigger = findSettingsTrigger()
        if (open) closeSignalOverlays()
        document.body.classList.toggle('dsh-signal-settings-open', open)
        if (!open && wasOpen) {
          const target = settingsTrigger
          settingsTrigger = null
          if (target?.isConnected) window.requestAnimationFrame(() => target.focus({ preventScroll: true }))
        }
        wasOpen = open
      }

      const schedule = () => {
        if (queued || disposed) return
        queued = true
        queueMicrotask(update)
      }

      const observer = new MutationObserver(schedule)
      observer.observe(document.body, { childList: true, subtree: true })
      update()
      ctx.effect(() => () => {
        disposed = true
        observer.disconnect()
        composerSeat?.removeAttribute('data-dsh-signal-composer-seat')
        document.body.classList.remove('dsh-signal-settings-open')
      }, 'dsh-signal: settings layer guard')
    }

    function installSignalCardMotion(ctx) {
      const selector = '.dsh-signal-popover, .dsh-signal-explainer-panel, .dsh-signal-brand-editor-card, .dsh-signal-day-detail, .dsh-signal-kpis'
      const reduced = matchMedia('(prefers-reduced-motion: reduce)')
      let active = null, rect = null, frame = 0, point = null
      const reset = () => {
        if (frame) cancelAnimationFrame(frame)
        frame = 0
        active?.removeAttribute('data-signal-pointer')
        active = null
        rect = null
      }
      const paint = () => {
        frame = 0
        if (!active?.isConnected || !point || !rect) return
        active.style.setProperty('--signal-light-x', `${point.x - rect.left}px`)
        active.style.setProperty('--signal-light-y', `${point.y - rect.top}px`)
      }
      const move = event => {
        if (reduced.matches || document.hidden || event.pointerType === 'touch') return
        const next = event.target instanceof Element ? event.target.closest(selector) : null
        if (next !== active) {
          reset()
          active = next
          if (active) { rect = active.getBoundingClientRect(); active.setAttribute('data-signal-pointer', '') }
        }
        if (!active) return
        point = { x: event.clientX, y: event.clientY }
        if (!frame) frame = requestAnimationFrame(paint)
      }
      const visibility = () => {
        document.body.classList.toggle('dsh-signal-motion-paused', document.hidden)
        if (document.hidden) reset()
      }
      document.addEventListener('pointermove', move, { passive: true })
      document.addEventListener('visibilitychange', visibility)
      document.addEventListener('scroll', reset, { passive: true, capture: true })
      window.addEventListener('resize', reset, { passive: true })
      window.addEventListener('blur', reset)
      reduced.addEventListener('change', reset)
      visibility()
      ctx.effect(() => () => {
        reset()
        document.removeEventListener('pointermove', move)
        document.removeEventListener('visibilitychange', visibility)
        document.removeEventListener('scroll', reset, true)
        window.removeEventListener('resize', reset)
        window.removeEventListener('blur', reset)
        reduced.removeEventListener('change', reset)
        document.body.classList.remove('dsh-signal-motion-paused')
      }, 'dsh-signal: bounded card light')
    }

    function makeStore(initial) {
      let snapshot = initial
      const listeners = new Set()
      return {
        getSnapshot: () => snapshot,
        subscribe(fn) {
          listeners.add(fn)
          return () => listeners.delete(fn)
        },
        set(next) {
          snapshot = next
          for (const listener of listeners) listener()
        },
      }
    }

    // All Signal-owned popovers share one active surface.  This keeps the
    // resource details, work explainer, and Settings dialog from competing for
    // focus or leaving two document-level Escape handlers active at once.
    const signalOverlayOwners = new Map()
    function claimSignalOverlay(kind, close) {
      for (const [otherKind, otherClose] of signalOverlayOwners) {
        if (otherKind === kind) continue
        signalOverlayOwners.delete(otherKind)
        try { otherClose() } catch { /* the owner is already unmounting */ }
      }
      signalOverlayOwners.set(kind, close)
      return () => {
        if (signalOverlayOwners.get(kind) === close) signalOverlayOwners.delete(kind)
      }
    }
    function closeSignalOverlays() {
      const owners = [...signalOverlayOwners.values()]
      signalOverlayOwners.clear()
      for (const close of owners) {
        try { close() } catch { /* the owner is already unmounting */ }
      }
    }

    const BRAND_OVERRIDES_KEY = 'dsh-signal.provider-overrides.v1'
    const PROVIDER_ICON_IDS = ['custom', 'deepseek', 'openai', 'anthropic', 'google', 'alibaba', 'zhipuai', 'kimi', 'opencode', 'mistral', 'openrouter', 'siliconflow', 'groq']

    function normalizeProviderOverride(value) {
      if (value === null || typeof value !== 'object' || Array.isArray(value)) return null
      const brand = typeof value.brand === 'string' ? value.brand.trim().slice(0, 48) : ''
      const plan = typeof value.plan === 'string' ? value.plan.trim().slice(0, 64) : ''
      const icon = PROVIDER_ICON_IDS.includes(value.icon) ? value.icon : 'custom'
      return brand.length > 0 || plan.length > 0 || icon !== 'custom' ? { brand, plan, icon } : null
    }

    function loadProviderOverrides() {
      try {
        const parsed = JSON.parse(window.localStorage.getItem(BRAND_OVERRIDES_KEY) ?? '{}')
        if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) return {}
        return Object.fromEntries(Object.entries(parsed).flatMap(([id, value]) => {
          const key = String(id).trim().toLowerCase()
          const normalized = normalizeProviderOverride(value)
          return key.length > 0 && normalized !== null ? [[key, normalized]] : []
        }))
      } catch {
        return {}
      }
    }

    const providerOverrides = makeStore(loadProviderOverrides())

    function persistProviderOverrides(next) {
      try {
        window.localStorage.setItem(BRAND_OVERRIDES_KEY, JSON.stringify(next))
      } catch {
        return false
      }
      providerOverrides.set(next)
      return true
    }

    function saveProviderOverride(providerId, value) {
      const id = String(providerId ?? '').trim().toLowerCase()
      if (id.length === 0) return false
      const normalized = normalizeProviderOverride(value)
      const next = { ...providerOverrides.getSnapshot() }
      if (normalized === null) delete next[id]
      else next[id] = normalized
      return persistProviderOverrides(next)
    }

    function removeProviderOverride(providerId) {
      const id = String(providerId ?? '').trim().toLowerCase()
      if (id.length === 0) return
      const next = { ...providerOverrides.getSnapshot() }
      delete next[id]
      return persistProviderOverrides(next)
    }

    function useMinuteClock(enabled = true) {
      const [value, setValue] = useState(() => Date.now())
      useEffect(() => {
        if (!enabled) return undefined
        setValue(Date.now())
        let interval = 0
        const tick = () => setValue(Date.now())
        const timeout = window.setTimeout(() => {
          tick()
          interval = window.setInterval(tick, 60_000)
        }, 60_000 - (Date.now() % 60_000) + 25)
        return () => {
          window.clearTimeout(timeout)
          if (interval !== 0) window.clearInterval(interval)
        }
      }, [enabled])
      return value
    }

    function parseObject(value, label) {
      if (value === null || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${label} 必须是对象`)
      return value
    }

    const stateCodec = { parse: value => parseObject(value, 'resource state') }
    const analyticsCodec = { parse: value => parseObject(value, 'usage analytics') }
    const sourceCodec = {
      parse(value) {
        if (!['deepseek', 'opencode', 'openrouter', 'moonshot', 'moonshot-cn', 'siliconflow', 'all'].includes(value)) throw new Error('未知资源源')
        return value
      },
    }
    const CONTRIBUTION = {
      package: 'dsh-signal',
      descriptors: [
        {
          id: 'dsh-signal#signalResource/getState',
          service: 'signalResource',
          namespace: 'signalResource',
          method: 'getState',
          invocation: { kind: 'direct' },
          parameters: [],
          result: { mode: 'strict', typeSymbol: 'dsh-signal#ResourceState', schema: stateCodec },
        },
        {
          id: 'dsh-signal#signalResource/refreshSource',
          service: 'signalResource',
          namespace: 'signalResource',
          method: 'refreshSource',
          invocation: { kind: 'direct' },
          parameters: [
            { name: 'source', wire: 'source', source: 'json', codec: { mode: 'strict', typeSymbol: 'dsh-signal#ResourceSource', schema: sourceCodec } },
          ],
          result: { mode: 'strict', typeSymbol: 'dsh-signal#ResourceState', schema: stateCodec },
        },
        {
          id: 'dsh-signal#signalResource/getAnalytics',
          service: 'signalResource',
          namespace: 'signalResource',
          method: 'getAnalytics',
          invocation: { kind: 'direct' },
          parameters: [],
          result: { mode: 'strict', typeSymbol: 'dsh-signal#UsageAnalytics', schema: analyticsCodec },
        },
        {
          id: 'dsh-signal#signalResource/refreshAnalytics',
          service: 'signalResource',
          namespace: 'signalResource',
          method: 'refreshAnalytics',
          invocation: { kind: 'direct' },
          parameters: [],
          result: { mode: 'strict', typeSymbol: 'dsh-signal#UsageAnalytics', schema: analyticsCodec },
        },
      ],
    }

    function parseRgb(value) {
      const match = /rgba?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)/i.exec(value)
      return match === null ? [35, 42, 57] : [Number(match[1]), Number(match[2]), Number(match[3])]
    }

    function seeded(x, y) {
      const value = Math.sin(x * 91.173 + y * 47.713) * 43758.5453
      return value - Math.floor(value)
    }

    function clamp(value, minimum, maximum) {
      return Math.max(minimum, Math.min(maximum, value))
    }

    function setupSignalField(canvas, headline, wordmarkTarget, onFrame = () => {}) {
      const context = canvas.getContext('2d', { alpha: true })
      if (context === null) return { stop() {}, pulse() {}, resume() {} }
      canvas.setAttribute('aria-hidden', 'true')
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
      const fine = window.matchMedia('(pointer: fine)')
      const startedAt = performance.now()
      let frame = 0
      let width = 0
      let height = 0
      let points = []
      let neutral = [35, 42, 57]
      let lightTheme = false
      let targetX = 0
      let targetY = 0
      let offsetX = 0
      let offsetY = 0
      let velocityX = 0
      let velocityY = 0
      let pointerX = 0
      let pointerY = 0
      let localTarget = 0
      let localStrength = 0
      let pulseStartedAt = -Infinity
      let disposed = false
      let intersecting = true
      let scheduled = false
      let lastPaint = 0

      const refreshPalette = () => {
        const label = parseRgb(getComputedStyle(wordmarkTarget).color)
        lightTheme = (label[0] + label[1] + label[2]) / 3 < 128
        neutral = lightTheme ? [112, 121, 136] : label
      }

      const resize = () => {
        const rect = canvas.getBoundingClientRect()
        width = Math.max(1, rect.width)
        height = Math.max(1, rect.height)
        const dpr = Math.min(2, window.devicePixelRatio || 1)
        canvas.width = Math.round(width * dpr)
        canvas.height = Math.round(height * dpr)
        context.setTransform(dpr, 0, 0, dpr, 0, 0)
        refreshPalette()
        const pitch = width < 560 ? 14.2 : 14.8
        const next = []
        let row = 0
        for (let y = -pitch; y <= height + pitch; y += pitch) {
          let column = 0
          for (let x = -pitch; x <= width + pitch; x += pitch) {
            const noise = seeded(column, row)
            next.push({
              x: x + (row % 2) * .55,
              y,
              noise,
              phase: noise * Math.PI * 2,
              depth: .36 + seeded(column + 17, row + 31) * .64,
              residual: noise > .982,
            })
            column += 1
          }
          row += 1
        }
        points = next
      }

      const onPointer = event => {
        if (reduce.matches || !fine.matches || event.pointerType === 'touch') {
          targetX = 0
          targetY = 0
          localTarget = 0
          return
        }
        const rect = canvas.getBoundingClientRect()
        const near = event.clientX >= rect.left - 90 && event.clientX <= rect.right + 90
          && event.clientY >= rect.top - 80 && event.clientY <= rect.bottom + 80
        if (!near) {
          targetX = 0
          targetY = 0
          localTarget = 0
          return
        }
        const nx = Math.max(-1, Math.min(1, (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)))
        const ny = Math.max(-1, Math.min(1, (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)))
        targetX = nx * 6
        targetY = ny * 4.2
        pointerX = event.clientX - rect.left
        pointerY = event.clientY - rect.top
        const wordmarkRect = wordmarkTarget.getBoundingClientRect()
        const overWordmark = event.clientX >= wordmarkRect.left - 30 && event.clientX <= wordmarkRect.right + 30
          && event.clientY >= wordmarkRect.top - 28 && event.clientY <= wordmarkRect.bottom + 28
        const overField = event.clientX >= rect.left && event.clientX <= rect.right
          && event.clientY >= rect.top && event.clientY <= rect.bottom
        localTarget = overWordmark ? 1 : overField ? .42 : 0
      }

      const rest = () => {
        targetX = 0
        targetY = 0
        localTarget = 0
      }

      const pulse = (clientX, clientY) => {
        if (reduce.matches || !fine.matches) return
        const rect = canvas.getBoundingClientRect()
        pointerX = clientX - rect.left
        pointerY = clientY - rect.top
        localTarget = 1
        pulseStartedAt = performance.now()
        schedule()
      }

      const shouldAnimate = () => !disposed && !reduce.matches && intersecting && !document.hidden

      const schedule = () => {
        if (!shouldAnimate() || scheduled) return
        scheduled = true
        frame = requestAnimationFrame(draw)
      }

      const scheduleStatic = () => {
        if (disposed || scheduled) return
        scheduled = true
        frame = requestAnimationFrame(timestamp => draw(timestamp + 2000))
      }

      const draw = timestamp => {
        scheduled = false
        if (disposed) return
        onFrame(timestamp)
        const revealActive = timestamp - startedAt < 1_450
        const interactive = localTarget !== 0 || localStrength > .02 || pulseAliveAt(timestamp)
        if (!reduce.matches && !interactive && !revealActive && lastPaint > 0 && timestamp - lastPaint < 1_000 / 30) {
          schedule()
          return
        }
        lastPaint = timestamp
        context.clearRect(0, 0, width, height)
        const elapsed = timestamp - startedAt
        const reveal = reduce.matches ? 1 : Math.max(0, Math.min(1, (elapsed - 110) / 1220))
        const wave = -60 + reveal * (width + 120)
        const pulseProgress = Math.max(0, Math.min(1, (timestamp - pulseStartedAt) / 980))
        const pulseAlive = timestamp - pulseStartedAt >= 0 && timestamp - pulseStartedAt < 980

        if (reduce.matches || !fine.matches) {
          offsetX = 0
          offsetY = 0
          velocityX = 0
          velocityY = 0
        } else {
          velocityX = (velocityX + (targetX - offsetX) * .034) * .86
          velocityY = (velocityY + (targetY - offsetY) * .034) * .86
          offsetX += velocityX
          offsetY += velocityY
        }
        localStrength += (localTarget - localStrength) * (localTarget > localStrength ? .24 : .07)

        for (const point of points) {
          const nx = Math.abs((point.x - width / 2) / (width / 2))
          const ny = Math.abs((point.y - height / 2) / (height / 2))
          const edge = Math.max(0, 1 - Math.pow(nx, 1.7)) * Math.max(0, 1 - Math.pow(ny, 1.45))
          if (edge <= .015) continue
          const distance = Math.abs(point.x - wave)
          const acquisition = reveal < 1 ? Math.max(0, 1 - distance / 54) : 0
          const trail = reveal < 1 && point.x < wave ? Math.max(0, 1 - (wave - point.x) / 155) : 0
          const dx = point.x - pointerX
          const dy = point.y - pointerY
          const localDistance = Math.max(.01, Math.hypot(dx, dy))
          const proximity = Math.max(0, 1 - localDistance / 206) * localStrength
          const shockRadius = pulseProgress * 176
          const shock = pulseAlive ? Math.max(0, 1 - Math.abs(localDistance - shockRadius) / 36) * (1 - pulseProgress * .35) : 0
          const depthResponse = .72 + point.depth * .38
          const surfaceRipple = (Math.sin(localDistance / 15.5 - timestamp / 190 + point.phase * .14)
            + Math.sin(localDistance / 31 + timestamp / 430 - point.phase * .2) * .34) * proximity
          const pulseRipple = Math.sin((localDistance - shockRadius) / 10.5) * shock
          const displacement = (surfaceRipple * 8.1 + pulseRipple * 9.2) * depthResponse
          const jitter = (acquisition + shock * .45) * (point.noise - .5) * 4.2
          const crest = Math.max(0, surfaceRipple) + Math.max(0, pulseRipple)
          const alpha = Math.min(.92, edge * ((lightTheme ? .2 : .13) + point.noise * (lightTheme ? .13 : .11) + point.depth * .025 + acquisition * .34 + trail * .085 + Math.abs(surfaceRipple) * .48 + shock * .42))
          const blue = acquisition > .12 || crest > .12 || shock > .06 || (point.residual && edge > .24)
          const radius = .9 + point.noise * .62 + point.depth * .13 + acquisition * .56 + crest * .78 + shock * .46
          const currentX = reduce.matches ? 0 : (Math.sin(timestamp / (3500 - point.depth * 740) + point.phase) * .28 + Math.cos(timestamp / 5100 + point.phase * .7) * .12) * point.depth
          const currentY = reduce.matches ? 0 : (Math.cos(timestamp / (4100 - point.depth * 620) + point.phase * .8) * .22 + Math.sin(timestamp / 5700 - point.phase) * .09) * point.depth
          const x = point.x + offsetX * depthResponse + currentX + jitter + (dx / localDistance) * displacement * .78
          const y = point.y + offsetY * depthResponse + currentY + Math.sin(point.phase + timestamp / 680) * acquisition * 2.2
            + (dy / localDistance) * displacement * .46 + surfaceRipple * 1.45
          context.beginPath()
          context.arc(x, y, radius, 0, Math.PI * 2)
          context.fillStyle = blue
            ? `rgba(79,124,255,${Math.max(.08, alpha)})`
            : `rgba(${neutral[0]},${neutral[1]},${neutral[2]},${alpha})`
          context.fill()
        }
        schedule()
      }

      const pulseAliveAt = timestamp => timestamp - pulseStartedAt >= 0 && timestamp - pulseStartedAt < 980

      const paintNow = () => {
        if (disposed) return
        if (scheduled) cancelAnimationFrame(frame)
        scheduled = false
        draw(performance.now() + (reduce.matches ? 2000 : 0))
      }

      const observer = new ResizeObserver(() => {
        resize()
        if (reduce.matches) scheduleStatic()
        else schedule()
      })
      observer.observe(canvas)
      const themeObserver = new MutationObserver(refreshPalette)
      const themeWatch = { attributes: true, attributeFilter: ['style', 'class', 'data-theme'] }
      themeObserver.observe(document.documentElement, themeWatch)
      themeObserver.observe(document.body, themeWatch)
      // The field owns its pointer region.  Listening on window made every
      // mouse move in the application run geometry work even when the Hero was
      // nowhere near the pointer.
      headline.addEventListener('pointerenter', onPointer, { passive: true })
      headline.addEventListener('pointermove', onPointer, { passive: true })
      headline.addEventListener('pointerleave', rest)
      window.addEventListener('blur', rest)
      const onVisibility = () => {
        if (document.hidden) {
          rest()
          if (scheduled) cancelAnimationFrame(frame)
          scheduled = false
          return
        }
        if (reduce.matches) scheduleStatic()
        else schedule()
      }
      const intersectionObserver = typeof IntersectionObserver === 'function'
        ? new IntersectionObserver(entries => {
          intersecting = entries.some(entry => entry.isIntersecting)
          if (!intersecting && scheduled) cancelAnimationFrame(frame)
          scheduled = false
          if (intersecting) schedule()
        }, { rootMargin: '120px' })
        : null
      intersectionObserver?.observe(canvas)
      document.addEventListener('visibilitychange', onVisibility)
      resize()
      paintNow()

      return {
        pulse,
        resume() {
          if (disposed) return
          intersecting = true
          resize()
          paintNow()
        },
        stop() {
          disposed = true
          cancelAnimationFrame(frame)
          scheduled = false
          observer.disconnect()
          themeObserver.disconnect()
          intersectionObserver?.disconnect()
          headline.removeEventListener('pointerenter', onPointer)
          headline.removeEventListener('pointermove', onPointer)
          headline.removeEventListener('pointerleave', rest)
          window.removeEventListener('blur', rest)
          document.removeEventListener('visibilitychange', onVisibility)
        },
      }
    }

    function setupWordmarkTracker(headline, title, getFxRect, reduce) {
      const finePointer = window.matchMedia('(pointer: fine)').matches
      let disposed = false
      let hovering = false
      let initialized = false
      let lastFrame = 0
      let lastPointerAt = 0
      let lastPointerX = 0
      let lastPointerY = 0
      let targetX = 0
      let targetY = 0
      let currentX = 0
      let currentY = 0
      let targetVelocityX = 0
      let targetVelocityY = 0
      let velocityX = 0
      let velocityY = 0
      let intensity = 0

      const setVariable = (name, value) => headline.style.setProperty(name, value)
      const exposeState = state => {
        headline.classList.add('dsh-signal-wordmark-live')
        headline.dataset.dshSignalWordmarkLive = 'true'
        headline.dataset.dshSignalWordmarkState = state
        title.dataset.dshSignalTitleActive = 'true'
      }
      const clearState = () => {
        headline.classList.remove('dsh-signal-wordmark-live')
        delete headline.dataset.dshSignalWordmarkLive
        delete headline.dataset.dshSignalWordmarkState
        delete title.dataset.dshSignalTitleActive
        setVariable('--dsh-signal-refract-opacity', '0')
        setVariable('--dsh-signal-caustic-opacity', '0')
        setVariable('--dsh-signal-meniscus-opacity', '0')
        setVariable('--dsh-signal-wake-opacity', '0')
        setVariable('--dsh-signal-lumen-opacity', '0')
        setVariable('--dsh-signal-shadow-alpha', '0')
        setVariable('--dsh-signal-glow-alpha', '0')
      }

      const onPointer = event => {
        if (disposed || reduce || !finePointer || event.pointerType === 'touch') return
        const rect = getFxRect(true)
        if (rect === null || rect.width <= 0 || rect.height <= 0) return
        const samples = typeof event.getCoalescedEvents === 'function' ? event.getCoalescedEvents() : []
        const sample = samples.length > 0 ? samples[samples.length - 1] : event
        const x = clamp(sample.clientX - rect.left, 0, rect.width)
        const y = clamp(sample.clientY - rect.top, 0, rect.height)
        const now = performance.now()
        if (!initialized) {
          initialized = true
          currentX = x
          currentY = y
          targetX = x
          targetY = y
        } else if (lastPointerAt > 0) {
          const elapsed = clamp(now - lastPointerAt, 4, 64)
          const frameScale = 16.667 / elapsed
          targetVelocityX = clamp((x - lastPointerX) * frameScale, -28, 28)
          targetVelocityY = clamp((y - lastPointerY) * frameScale, -22, 22)
        }
        targetX = x
        targetY = y
        lastPointerX = x
        lastPointerY = y
        lastPointerAt = now
        hovering = true
        headline.classList.remove('dsh-signal-revealing')
        exposeState('tracking')
      }

      const rest = () => {
        if (!initialized) return
        hovering = false
        lastPointerAt = 0
        targetVelocityX *= .28
        targetVelocityY *= .28
        if (intensity > .01) exposeState('settling')
      }

      const onVisibility = () => {
        if (document.hidden) rest()
      }

      const tick = timestamp => {
        if (disposed || reduce || !finePointer || !initialized) return
        const rect = getFxRect(false)
        if (rect === null || rect.width <= 0 || rect.height <= 0) return
        const delta = clamp(lastFrame === 0 ? 16.667 : timestamp - lastFrame, 4, 48)
        lastFrame = timestamp
        const positionFollow = 1 - Math.exp(-delta / 26)
        const velocityFollow = 1 - Math.exp(-delta / 44)
        const intensityFollow = 1 - Math.exp(-delta / (hovering ? 38 : 220))
        currentX += (targetX - currentX) * positionFollow
        currentY += (targetY - currentY) * positionFollow
        velocityX += (targetVelocityX - velocityX) * velocityFollow
        velocityY += (targetVelocityY - velocityY) * velocityFollow
        targetVelocityX *= Math.exp(-delta / 54)
        targetVelocityY *= Math.exp(-delta / 54)
        intensity += ((hovering ? 1 : 0) - intensity) * intensityFollow

        const speed = clamp(Math.hypot(velocityX, velocityY) / 14, 0, 1)
        const breathe = .5 + Math.sin(timestamp / 430) * .5
        const active = hovering || intensity > .012 || speed > .012
          || Math.abs(targetX - currentX) > .18 || Math.abs(targetY - currentY) > .18
        if (!active) {
          intensity = 0
          velocityX = 0
          velocityY = 0
          clearState()
          return
        }

        exposeState(hovering ? 'tracking' : 'settling')
        const surfacePhase = timestamp / 205 + currentX * .022 + currentY * .011
        const crossPhase = timestamp / 360 - currentY * .017
        const refractX = clamp(velocityX * .28 + (Math.sin(surfacePhase) * 2.15 + Math.cos(crossPhase) * .62) * intensity, -7.8, 7.8)
        const refractY = clamp(velocityY * .18 + (Math.cos(surfacePhase * 1.24) * 1.5 + Math.sin(crossPhase) * .48) * intensity, -5.6, 5.6)
        const causticX = clamp(-velocityX * .16 + Math.sin(surfacePhase + 1.72) * intensity * 1.72, -5.6, 5.6)
        const causticY = clamp(-velocityY * .13 + Math.cos(surfacePhase * 1.13 + .74) * intensity * 2.05, -5.4, 5.4)
        const wakeX = clamp(-velocityX * .52 + Math.sin(crossPhase) * intensity * .8, -12.5, 12.5)
        const wakeY = clamp(-velocityY * .4 + Math.sin(surfacePhase * .78) * intensity * .88, -8.5, 8.5)
        const radiusX = 126 + speed * 46 + breathe * 12
        const radiusY = 42 + speed * 16 + breathe * 8
        const refractOpacity = clamp(intensity * (.42 + breathe * .18 + speed * .24), 0, .84)
        const causticOpacity = clamp(intensity * (.27 + breathe * .19 + speed * .28), 0, .74)
        const meniscusOpacity = clamp(intensity * (.38 + breathe * .22 + speed * .24), 0, .84)
        const wakeOpacity = clamp(intensity * (.1 + breathe * .07 + speed * .42), 0, .59)
        const shadowAlpha = clamp(intensity * (.08 + breathe * .07 + speed * .12), 0, .27)
        const lumenOpacity = clamp(intensity * (.86 + breathe * .1 + speed * .04), 0, 1)
        const glowAlpha = clamp(intensity * (.24 + breathe * .15 + speed * .12), 0, .51)

        setVariable('--dsh-signal-origin-x', `${currentX.toFixed(2)}px`)
        setVariable('--dsh-signal-origin-y', `${currentY.toFixed(2)}px`)
        setVariable('--dsh-signal-refract-x', `${refractX.toFixed(2)}px`)
        setVariable('--dsh-signal-refract-y', `${refractY.toFixed(2)}px`)
        setVariable('--dsh-signal-caustic-x', `${causticX.toFixed(2)}px`)
        setVariable('--dsh-signal-caustic-y', `${causticY.toFixed(2)}px`)
        setVariable('--dsh-signal-wake-x', `${wakeX.toFixed(2)}px`)
        setVariable('--dsh-signal-wake-y', `${wakeY.toFixed(2)}px`)
        setVariable('--dsh-signal-water-tilt', `${clamp(-velocityX * .12, -2.8, 2.8).toFixed(2)}deg`)
        setVariable('--dsh-signal-water-radius-x', `${radiusX.toFixed(2)}px`)
        setVariable('--dsh-signal-water-radius-y', `${radiusY.toFixed(2)}px`)
        setVariable('--dsh-signal-wake-radius-x', `${(radiusX * 1.28).toFixed(2)}px`)
        setVariable('--dsh-signal-wake-radius-y', `${(radiusY * 1.42).toFixed(2)}px`)
        setVariable('--dsh-signal-glow-x', `${(refractX * .38 + causticX * .12).toFixed(2)}px`)
        setVariable('--dsh-signal-glow-y', `${(refractY * .34 + causticY * .1).toFixed(2)}px`)
        setVariable('--dsh-signal-glow-radius-x', `${(radiusX * 1.13).toFixed(2)}px`)
        setVariable('--dsh-signal-glow-radius-y', `${(radiusY * 1.36).toFixed(2)}px`)
        setVariable('--dsh-signal-refract-opacity', refractOpacity.toFixed(3))
        setVariable('--dsh-signal-caustic-opacity', causticOpacity.toFixed(3))
        setVariable('--dsh-signal-meniscus-opacity', meniscusOpacity.toFixed(3))
        setVariable('--dsh-signal-wake-opacity', wakeOpacity.toFixed(3))
        setVariable('--dsh-signal-lumen-opacity', lumenOpacity.toFixed(3))
        setVariable('--dsh-signal-shadow-x', `${clamp(velocityX * .14, -3, 3).toFixed(2)}px`)
        setVariable('--dsh-signal-shadow-y', `${clamp(velocityY * .11, -2.2, 2.2).toFixed(2)}px`)
        setVariable('--dsh-signal-shadow-alpha', shadowAlpha.toFixed(3))
        setVariable('--dsh-signal-glow-alpha', glowAlpha.toFixed(3))
      }

      headline.addEventListener('pointerenter', onPointer)
      headline.addEventListener('pointermove', onPointer, { passive: true })
      headline.addEventListener('pointerleave', rest)
      headline.addEventListener('pointercancel', rest)
      window.addEventListener('blur', rest)
      document.addEventListener('visibilitychange', onVisibility)

      return {
        tick,
        stop() {
          disposed = true
          headline.removeEventListener('pointerenter', onPointer)
          headline.removeEventListener('pointermove', onPointer)
          headline.removeEventListener('pointerleave', rest)
          headline.removeEventListener('pointercancel', rest)
          window.removeEventListener('blur', rest)
          document.removeEventListener('visibilitychange', onVisibility)
          clearState()
        },
      }
    }

    function SignalMark({ className }) {
      const rootRef = useRef(null)
      useLayoutEffect(() => {
        const root = rootRef.current
        if (!(root instanceof HTMLElement)) return undefined
        let disposed = false
        let reconcileFrame = 0 // DSH_DESKTOP_BOUNDED_BRAND_RECONCILE
        let mount = null

        const resolveBrandNodes = () => {
          const slot = root.closest('[data-slot="conversation.hero.brand.mark"]')
          const markOwner = slot?.parentElement
          const headline = markOwner?.parentElement
          if (!(headline instanceof HTMLElement) || !(markOwner instanceof HTMLElement)) return null
          const children = [...headline.children].filter(value => !value.matches?.('[data-dsh-signal-fx-host]'))
          const title = children.find(value => value !== markOwner && value instanceof HTMLElement)
          const badge = title === undefined
            ? undefined
            : children.find(value => value !== markOwner && value !== title && value instanceof HTMLElement)
          return title instanceof HTMLElement ? { markOwner, headline, title, badge } : null
        }

        const createBrandFxMount = ({ markOwner, headline, title, badge }) => {
          headline.classList.add('dsh-signal-hero')
          markOwner.classList.add('dsh-signal-hero-mark')
          title.classList.add('dsh-signal-hero-title')
          title.dataset.dshSignalTitle = ''
          badge?.classList.add('dsh-signal-hero-badge')
          const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
          if (!reduce) headline.classList.add('dsh-signal-revealing')

          const fxHost = document.createElement('span')
          fxHost.className = 'dsh-signal-fx-host'
          fxHost.dataset.dshSignalFxHost = ''
          fxHost.setAttribute('aria-hidden', 'true')
          const layers = ['lumen', 'refract', 'caustic', 'meniscus', 'wake'].map(kind => {
            const layer = document.createElement('span')
            layer.className = `dsh-signal-wordmark-fx ${kind}`
            layer.setAttribute('aria-hidden', 'true')
            const markCopy = root.cloneNode(true)
            markCopy.classList.add('dsh-signal-wordmark-fx-mark')
            markCopy.setAttribute('aria-hidden', 'true')
            const titleCopy = document.createElement('span')
            titleCopy.className = 'dsh-signal-wordmark-fx-title'
            titleCopy.setAttribute('aria-hidden', 'true')
            layer.append(markCopy, titleCopy)
            fxHost.append(layer)
            return { layer, markCopy, titleCopy }
          })
          const canvas = document.createElement('canvas')
          canvas.className = 'dsh-signal-field'
          fxHost.prepend(canvas)
          headline.append(fxHost)

          let fxRect = null
          let visualText = null
          let titleColor = null
          const refreshVisuals = () => {
            const nextText = title.textContent?.trim() ?? ''
            const nextColor = getComputedStyle(title).color
            if (nextText === visualText && nextColor === titleColor) return
            visualText = nextText
            titleColor = nextColor
            title.style.setProperty('--dsh-signal-title-color', titleColor)
            for (const { layer, titleCopy } of layers) {
              layer.style.setProperty('--dsh-signal-title-color', titleColor)
              titleCopy.textContent = visualText
            }
          }
          const updateFxGeometry = () => {
            refreshVisuals()
            const headlineRect = headline.getBoundingClientRect()
            const markRect = markOwner.getBoundingClientRect()
            const titleRect = title.getBoundingClientRect()
            if (headlineRect.width <= 0 || markRect.width <= 0 || titleRect.width <= 0) return
            const pad = 28
            const left = Math.min(markRect.left, titleRect.left) - pad
            const top = Math.min(markRect.top, titleRect.top) - pad
            const right = Math.max(markRect.right, titleRect.right) + pad
            const bottom = Math.max(markRect.bottom, titleRect.bottom) + pad
            fxRect = { left, top, width: right - left, height: bottom - top }
            const titleStyle = getComputedStyle(title)
            for (const { layer, markCopy, titleCopy } of layers) {
              layer.style.left = `${left - headlineRect.left}px`
              layer.style.top = `${top - headlineRect.top}px`
              layer.style.width = `${right - left}px`
              layer.style.height = `${bottom - top}px`
              markCopy.style.left = `${markRect.left - left}px`
              markCopy.style.top = `${markRect.top - top}px`
              titleCopy.style.left = `${titleRect.left - left}px`
              titleCopy.style.top = `${titleRect.top - top}px`
              titleCopy.style.width = `${titleRect.width}px`
              titleCopy.style.height = `${titleRect.height}px`
              titleCopy.style.fontFamily = titleStyle.fontFamily
              titleCopy.style.fontSize = titleStyle.fontSize
              titleCopy.style.fontWeight = titleStyle.fontWeight
              titleCopy.style.lineHeight = titleStyle.lineHeight
              titleCopy.style.letterSpacing = titleStyle.letterSpacing
            }
          }

          const geometryObserver = new ResizeObserver(updateFxGeometry)
          geometryObserver.observe(headline)
          geometryObserver.observe(markOwner)
          geometryObserver.observe(title)
          updateFxGeometry()
          const tracker = setupWordmarkTracker(headline, title, refresh => {
            if (refresh) updateFxGeometry()
            return fxRect
          }, reduce)
          const field = setupSignalField(canvas, headline, headline, tracker.tick)
          const timer = reduce ? 0 : window.setTimeout(() => headline.classList.remove('dsh-signal-revealing'), 1550)
          const visualNodes = [canvas, ...layers.map(({ layer }) => layer)]

          return {
            headline,
            markOwner,
            title,
            badge,
            fxHost,
            healthy() {
              return fxHost.parentElement === headline
                && visualNodes.every((node, index) => fxHost.children[index] === node)
            },
            refresh: updateFxGeometry,
            resume() {
              if (fxHost.parentElement !== headline) headline.append(fxHost)
              if (!visualNodes.every((node, index) => fxHost.children[index] === node)) {
                fxHost.replaceChildren(...visualNodes)
              }
              updateFxGeometry()
              field.resume()
            },
            stop() {
              if (timer !== 0) clearTimeout(timer)
              tracker.stop()
              geometryObserver.disconnect()
              field.stop()
              fxHost.remove()
              headline.classList.remove('dsh-signal-hero', 'dsh-signal-revealing', 'dsh-signal-wordmark-live')
              markOwner.classList.remove('dsh-signal-hero-mark')
              title.classList.remove('dsh-signal-hero-title')
              delete title.dataset.dshSignalTitle
              delete title.dataset.dshSignalTitleActive
              delete headline.dataset.dshSignalWordmarkLive
              delete headline.dataset.dshSignalWordmarkState
              title.style.removeProperty('--dsh-signal-title-color')
              badge?.classList.remove('dsh-signal-hero-badge')
            },
          }
        }

        const reconcileBrandFx = () => {
          reconcileFrame = 0
          if (disposed) return
          const nodes = resolveBrandNodes()
          if (nodes === null) {
            mount?.stop()
            mount = null
            return
          }
          const sameMount = mount !== null
            && mount.headline === nodes.headline
            && mount.markOwner === nodes.markOwner
            && mount.title === nodes.title
          if (!sameMount) {
            mount?.stop()
            mount = createBrandFxMount(nodes)
            return
          }
          if (mount.healthy()) mount.refresh()
          else mount.resume()
        }
        const mutationAffectsBrand = record => {
          const fxHost = mount?.fxHost
          if (fxHost instanceof Node && (record.target === fxHost || fxHost.contains(record.target))) return false
          const headline = mount?.headline
          if (headline instanceof Node && (record.target === headline || headline.contains(record.target))) return true
          const affectedNodes = [...record.addedNodes, ...record.removedNodes]
          return affectedNodes.some(node => {
            if (!(node instanceof Node)) return false
            if (fxHost instanceof Node && (node === fxHost || fxHost.contains(node))) return false
            return node === root
              || node.contains(root)
              || root.contains(node)
              || (headline instanceof Node && (
                node === headline
                || node.contains(headline)
                || headline.contains(node)
              ))
          })
        }
        const scheduleReconcile = () => {
          if (disposed || reconcileFrame !== 0) return
          reconcileFrame = window.requestAnimationFrame(reconcileBrandFx)
        }

        reconcileBrandFx()
        const integrityObserver = new MutationObserver(records => {
          if (records.some(mutationAffectsBrand)) scheduleReconcile()
        })
        const integrityScope = root.closest('[data-slot="conversation.hero.brand.mark"]')?.parentElement?.parentElement?.parentElement ?? document.body
        integrityObserver.observe(integrityScope, { childList: true, subtree: true, characterData: true })

        return () => {
          disposed = true
          integrityObserver.disconnect()
          if (reconcileFrame !== 0) window.cancelAnimationFrame(reconcileFrame)
          mount?.stop()
          mount = null
        }
      }, [])
      return el('span', { ref: rootRef, className: 'dsh-signal-mark', 'aria-hidden': 'true' },
        el(FishLogo, { size: 46, className: `${className ?? ''} dsh-signal-whale`.trim() }))
    }
