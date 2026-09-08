/**
 * DSH Signal Host service.
 *
 * Credentials stay in the Host process. Only normalized balance/quota values
 * and human-readable errors cross the Typert gateway to the browser.
 */

import fs from 'node:fs'
import path from 'node:path'
import { credentialRef } from '@deepseek-ai/dsh-credentials'
import { bindTypertRemote, Remote } from '@deepseek-ai/dsh-typert-protocol'

export const name = 'dsh-signal'

const BALANCE_TTL = 5 * 60_000
const GO_TTL = 15 * 60_000
const DIRECT_RESOURCE_TTL = 5 * 60_000
const ANALYTICS_TTL = 60_000
const ANALYTICS_DAYS = 365
const DEEPSEEK_HOST = 'api.deepseek.com'
const GO_URL = 'https://opencode.ai/zen/go/v1/usage'
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/key'
const MOONSHOT_URL = 'https://api.moonshot.ai/v1/users/me/balance'
const MOONSHOT_CN_URL = 'https://api.moonshot.cn/v1/users/me/balance'
const SILICONFLOW_HOSTS = new Set(['api.siliconflow.cn', 'api.siliconflow.com'])

function now() {
  return Date.now()
}

function status(kind = 'idle', message = '') {
  return { status: kind, message, fetchedAt: 0, attemptedAt: 0 }
}

function walletState() {
  return {
    ...status(),
    currency: '',
    totalBalance: 0,
    grantedBalance: 0,
    toppedUpBalance: 0,
  }
}

function openRouterState() {
  return {
    ...status(),
    currency: 'USD',
    usage: 0,
    usageDaily: 0,
    usageWeekly: 0,
    usageMonthly: 0,
    limit: null,
    limitRemaining: null,
    limitReset: '',
    freeTier: false,
  }
}

function initialState() {
  return {
    updatedAt: 0,
    balance: walletState(),
    go: {
      ...status(),
      rolling: null,
      weekly: null,
      monthly: null,
    },
    openrouter: openRouterState(),
    moonshot: walletState(),
    moonshotCn: walletState(),
    siliconflow: walletState(),
  }
}

function clone(value) {
  return structuredClone(value)
}

function unavailable(message) {
  const error = new Error(message)
  error.unavailable = true
  return error
}

function messageOf(error) {
  return error instanceof Error ? error.message : String(error)
}

function numberOrZero(value) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function numberOrNull(value) {
  if (value === null || value === undefined || value === '') return null
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

/** Guard the DeepSeek credential against non-official balance endpoints. */
export function balanceEndpoint(baseURL) {
  let base = String(baseURL ?? '').trim().replace(/\/+$/, '')
  if (base.length === 0) base = String(process.env.DEEPSEEK_BASE_URL ?? '').trim().replace(/\/+$/, '')
  if (base.length === 0) base = `https://${DEEPSEEK_HOST}`
  if (/\/v\d+$/i.test(base)) base = base.replace(/\/v\d+$/i, '')
  try {
    const url = new URL(base)
    if (url.protocol !== 'https:' || url.host.toLowerCase() !== DEEPSEEK_HOST) return null
    return `${url.origin}${url.pathname.replace(/\/$/, '')}/user/balance`
  } catch {
    return null
  }
}

/** Deterministically select the meaningful currency entry from balance_infos. */
export function pickBalanceInfo(infos) {
  const list = Array.isArray(infos) ? infos.filter(entry => entry !== null && typeof entry === 'object') : []
  const positive = list.filter(entry => Number(entry.total_balance) > 0)
  const cny = entries => entries.find(entry => String(entry.currency).toUpperCase() === 'CNY')
  return cny(positive) ?? positive[0] ?? cny(list) ?? list[0]
}

export function normalizeOpenRouterKey(body) {
  const data = body?.data
  if (data === null || typeof data !== 'object' || Array.isArray(data)) throw new Error('OpenRouter 响应缺少 data')
  const usage = numberOrNull(data.usage)
  if (usage === null) throw new Error('OpenRouter 响应缺少 usage')
  return {
    currency: 'USD',
    usage,
    usageDaily: numberOrZero(data.usage_daily),
    usageWeekly: numberOrZero(data.usage_weekly),
    usageMonthly: numberOrZero(data.usage_monthly),
    limit: numberOrNull(data.limit),
    limitRemaining: numberOrNull(data.limit_remaining),
    limitReset: typeof data.limit_reset === 'string' ? data.limit_reset : '',
    freeTier: data.is_free_tier === true,
  }
}

export function normalizeMoonshotBalance(body) {
  const data = body?.data
  if (body?.status !== true || data === null || typeof data !== 'object' || Array.isArray(data)) throw new Error('Kimi 余额响应缺少 data')
  const available = numberOrNull(data.available_balance)
  if (available === null) throw new Error('Kimi 余额响应缺少 available_balance')
  return {
    currency: '',
    totalBalance: available,
    grantedBalance: numberOrZero(data.voucher_balance),
    toppedUpBalance: numberOrZero(data.cash_balance),
  }
}

export function normalizeSiliconFlowBalance(body) {
  const data = body?.data
  if (body?.status !== true || data === null || typeof data !== 'object' || Array.isArray(data)) throw new Error('SiliconFlow 响应缺少 data')
  const total = numberOrNull(data.totalBalance)
  if (total === null) throw new Error('SiliconFlow 响应缺少 totalBalance')
  return {
    currency: '',
    totalBalance: total,
    grantedBalance: numberOrZero(data.balance),
    toppedUpBalance: numberOrZero(data.chargeBalance),
  }
}

export function normalizeGoWindow(raw) {
  if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) return null
  const percent = Number(raw.percent)
  if (!Number.isFinite(percent)) return null
  return {
    percent: Math.min(100, Math.max(0, percent)),
    resetsAt: typeof raw.resetsAt === 'string' ? raw.resetsAt : '',
  }
}

function usageNumber(value) {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0
}

function dateKey(value) {
  const date = new Date(value)
  if (!Number.isFinite(date.getTime())) return null
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function routeFromHeader(event) {
  const header = event?.data?.header
  const config = header?.config ?? header?.llm ?? header
  const provider = typeof config?.provider === 'string' ? config.provider : ''
  const model = typeof config?.model === 'string' ? config.model : ''
  return { provider, model }
}

function createUsageTotals() {
  return { total: 0, input: 0, output: 0, cacheRead: 0, cacheWrite: 0, reasoning: 0 }
}

function addUsage(target, usage) {
  target.input += usage.input
  target.output += usage.output
  target.cacheRead += usage.cacheRead
  target.cacheWrite += usage.cacheWrite
  target.reasoning += usage.reasoning
  target.total += usage.input + usage.output + usage.cacheRead + usage.cacheWrite
}

function breakdownRows(map) {
  return [...map.values()]
    .sort((a, b) => b.total - a.total || b.requests - a.requests || a.id.localeCompare(b.id))
    .slice(0, 12)
}

/** Fold usage metadata only; message bodies are never inspected. */
export function aggregateUsageSessions(snapshots, generatedAt = now(), skippedSessions = 0) {
  const totals = createUsageTotals()
  const daily = new Map()
  const providers = new Map()
  const models = new Map()
  const records = []
  const rangeEnd = new Date(generatedAt)
  rangeEnd.setHours(23, 59, 59, 999)
  const rangeStart = new Date(rangeEnd)
  rangeStart.setHours(0, 0, 0, 0)
  rangeStart.setDate(rangeStart.getDate() - (ANALYTICS_DAYS - 1))
  let firstUsageAt = Number.POSITIVE_INFINITY
  let reasoningReported = false

  for (const [sessionIndex, snapshot] of (Array.isArray(snapshots) ? snapshots : []).entries()) {
    let provider = ''
    let model = ''
    const events = Array.isArray(snapshot?.events) ? snapshot.events : []
    for (const event of events) {
      if (event?.type === 'request/context') {
        if (typeof event.data?.provider === 'string') provider = event.data.provider
        if (typeof event.data?.model === 'string') model = event.data.model
        continue
      }
      if (event?.type === 'request/header') {
        const route = routeFromHeader(event)
        if (route.provider) provider = route.provider
        if (route.model) model = route.model
        continue
      }
      if (event?.type !== 'assistant/message' || event.data?.usage === undefined) continue
      const raw = event.data.usage
      const reportsReasoning = Object.prototype.hasOwnProperty.call(raw, 'reasoningTokens') && Number.isFinite(Number(raw.reasoningTokens))
      const usage = {
        input: usageNumber(raw.inputTokens),
        output: usageNumber(raw.outputTokens),
        cacheRead: usageNumber(raw.cacheReadTokens),
        cacheWrite: usageNumber(raw.cacheWriteTokens),
        reasoning: usageNumber(raw.reasoningTokens),
      }
      const eventTime = Number(event.time)
      if (!Number.isFinite(eventTime) || eventTime < rangeStart.getTime() || eventTime > rangeEnd.getTime()) continue
      const key = dateKey(eventTime)
      if (key === null) continue

      addUsage(totals, usage)
      reasoningReported ||= reportsReasoning
      firstUsageAt = Math.min(firstUsageAt, eventTime)

      const providerId = provider || 'unknown'
      const modelId = model || 'unknown'
      const providerRow = providers.get(providerId) ?? { id: providerId, total: 0, requests: 0 }
      providerRow.total += usage.input + usage.output + usage.cacheRead + usage.cacheWrite
      providerRow.requests += 1
      providers.set(providerId, providerRow)
      const modelKey = `${providerId}/${modelId}`
      const modelRow = models.get(modelKey) ?? { id: modelKey, total: 0, requests: 0 }
      modelRow.total += usage.input + usage.output + usage.cacheRead + usage.cacheWrite
      modelRow.requests += 1
      models.set(modelKey, modelRow)

      const day = daily.get(key) ?? { date: key, ...createUsageTotals(), requests: 0 }
      addUsage(day, usage)
      day.requests += 1
      daily.set(key, day)
      records.push({
        date: key,
        time: eventTime,
        session: `session-${sessionIndex + 1}`,
        provider: providerId,
        model: modelId,
        reasoningReported: reportsReasoning,
        ...usage,
        total: usage.input + usage.output + usage.cacheRead + usage.cacheWrite,
      })
    }
  }

  const sessionCount = new Set(records.map(record => record.session)).size
  const requestCount = records.length

  return {
    status: 'ok',
    message: '',
    generatedAt,
    attemptedAt: generatedAt,
    lastSuccessfulAt: generatedAt,
    stale: false,
    rangeStart: dateKey(rangeStart.getTime()) ?? '',
    rangeEnd: dateKey(rangeEnd.getTime()) ?? '',
    coverageStart: Number.isFinite(firstUsageAt)
      ? dateKey(Math.max(firstUsageAt, rangeStart.getTime())) ?? ''
      : '',
    reasoningReported,
    sessionCount,
    skippedSessions,
    activeDays: daily.size,
    requestCount,
    totals,
    daily: [...daily.values()].sort((a, b) => a.date.localeCompare(b.date)),
    providers: breakdownRows(providers),
    models: breakdownRows(models),
    records,
  }
}

function unavailableAnalytics(message, attemptedAt = now()) {
  return {
    ...aggregateUsageSessions([], attemptedAt, 0),
    status: 'unavailable',
    message,
    generatedAt: 0,
    attemptedAt,
    lastSuccessfulAt: 0,
  }
}

async function mapWithConcurrency(items, limit, mapper) {
  const results = new Array(items.length)
  let cursor = 0
  const worker = async () => {
    while (cursor < items.length) {
      const index = cursor
      cursor += 1
      try {
        results[index] = { status: 'fulfilled', value: await mapper(items[index]) }
      } catch (reason) {
        results[index] = { status: 'rejected', reason }
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker))
  return results
}

async function queryUsageAnalytics(ctx) {
  const sessionQuery = typeof ctx?.get === 'function' ? ctx.get('sessionQuery') : ctx?.sessionQuery
  if (sessionQuery === undefined || typeof sessionQuery.listSessions !== 'function' || typeof sessionQuery.readSession !== 'function') {
    return unavailableAnalytics('DSH 会话查询服务尚未连接')
  }
  const records = await sessionQuery.listSessions()
  const results = await mapWithConcurrency(records, 4, record => sessionQuery.readSession(record.header.id))
  const snapshots = results.filter(result => result.status === 'fulfilled').map(result => result.value)
  const skipped = results.length - snapshots.length
  return aggregateUsageSessions(snapshots, now(), skipped)
}

async function fetchResponse(url, options = {}) {
  let lastError
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(new Error('请求超时')), 12_000)
    timer.unref?.()
    try {
      const response = await fetch(url, { ...options, signal: controller.signal })
      if (response.status >= 500 && attempt === 0) {
        await response.body?.cancel().catch(() => {})
        continue
      }
      return response
    } catch (error) {
      lastError = error
      if (attempt > 0) throw error
    } finally {
      clearTimeout(timer)
    }
  }
  throw lastError ?? new Error('请求失败')
}

async function resolveCredential(ctx, names) {
  const credentials = typeof ctx?.get === 'function' ? ctx.get('credentials') : undefined
  if (credentials !== undefined && typeof credentials.resolve === 'function') {
    for (const name of names) {
      try {
        const hit = await credentials.resolve(credentialRef(name))
        if (typeof hit?.value === 'string' && hit.value.trim().length > 0) return hit.value.trim()
      } catch {
        // Continue to the next safe source.
      }
    }
  }
  for (const name of names) {
    const value = String(process.env[name] ?? '').trim()
    if (value.length > 0) return value
  }
  return null
}

function piAiProviderProfile(ctx, providerIds) {
  const settings = typeof ctx?.get === 'function' ? ctx.get('settings') : undefined
  const section = typeof settings?.get === 'function' ? settings.get('llm-pi-ai') : undefined
  const providers = section?.providers
  if (providers === null || typeof providers !== 'object' || Array.isArray(providers)) return null
  for (const providerId of providerIds) {
    const profile = providers[providerId]
    if (profile !== null && typeof profile === 'object' && !Array.isArray(profile)) return profile
  }
  return null
}

async function resolveProviderCredential(ctx, providerIds, fallbackRefs) {
  const profile = piAiProviderProfile(ctx, providerIds)
  const configuredRef = typeof profile?.apiKeyEnv === 'string' && profile.apiKeyEnv.trim().length > 0
    ? [profile.apiKeyEnv.trim()]
    : []
  return {
    credential: await resolveCredential(ctx, [...configuredRef, ...fallbackRefs]),
    profile,
  }
}

export function siliconFlowEndpoint(baseURL) {
  const raw = String(baseURL ?? '').trim().replace(/\/+$/, '') || 'https://api.siliconflow.cn/v1'
  try {
    const url = new URL(raw)
    if (url.protocol !== 'https:' || !SILICONFLOW_HOSTS.has(url.host.toLowerCase())) return null
    const pathname = url.pathname.replace(/\/+$/, '')
    const basePath = /\/v1$/i.test(pathname) ? pathname : `${pathname}/v1`
    return `${url.origin}${basePath}/user/info`
  } catch {
    return null
  }
}

function findOpenCodeGoKey() {
  const user = process.env.USERPROFILE || process.env.HOME || ''
  const candidates = [
    user ? path.join(user, '.local', 'share', 'opencode', 'auth.json') : '',
    user ? path.join(user, '.config', 'opencode', 'auth.json') : '',
    process.env.XDG_CONFIG_HOME ? path.join(process.env.XDG_CONFIG_HOME, 'opencode', 'auth.json') : '',
    process.env.APPDATA ? path.join(process.env.APPDATA, 'opencode', 'auth.json') : '',
  ].filter(Boolean)
  for (const candidate of candidates) {
    try {
      const data = JSON.parse(fs.readFileSync(candidate, 'utf8'))
      const key = data?.['opencode-go']?.key
      if (typeof key === 'string' && key.trim().length > 0) return key.trim()
    } catch {
      // Missing or unrelated login files are an expected state.
    }
  }
  return null
}

async function queryDeepSeekBalance(ctx) {
  const settings = typeof ctx?.get === 'function' ? ctx.get('settings') : undefined
  const section = typeof settings?.get === 'function' ? settings.get('llm-deepseek') : undefined
  const apiKeyEnv = typeof section?.apiKeyEnv === 'string' && section.apiKeyEnv.trim().length > 0
    ? section.apiKeyEnv.trim()
    : 'DEEPSEEK_API_KEY'
  const apiKey = await resolveCredential(ctx, [apiKeyEnv])
  if (apiKey === null) throw unavailable('未找到 DeepSeek 凭据')
  const endpoint = balanceEndpoint(section?.baseURL)
  if (endpoint === null) throw unavailable('当前 DeepSeek Base URL 不是官方端点，已拒绝发送凭据')
  const response = await fetchResponse(endpoint, { headers: { authorization: `Bearer ${apiKey}` } })
  if (response.status === 401 || response.status === 403) throw unavailable('DeepSeek 凭据无效或无余额查询权限')
  if (!response.ok) throw new Error(`DeepSeek 余额接口 HTTP ${response.status}`)
  const data = await response.json()
  const info = pickBalanceInfo(data?.balance_infos)
  if (info === undefined) throw new Error('DeepSeek 余额响应缺少 balance_infos')
  return {
    currency: typeof info.currency === 'string' ? info.currency : '',
    totalBalance: numberOrZero(info.total_balance),
    grantedBalance: numberOrZero(info.granted_balance),
    toppedUpBalance: numberOrZero(info.topped_up_balance),
  }
}

async function queryOpenCodeGo(ctx) {
  const key = await resolveCredential(ctx, ['OPENCODE_GO_API_KEY', 'OPENCODE_API_KEY']) ?? findOpenCodeGoKey()
  if (key === null) throw unavailable('未找到 OpenCode Go 登录凭据')
  const response = await fetchResponse(GO_URL, {
    headers: {
      authorization: `Bearer ${key}`,
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/140 Safari/537.36',
    },
  })
  if (response.status === 401 || response.status === 403) throw unavailable('未检测到有效的 OpenCode Go 订阅')
  if (!response.ok) throw new Error(`OpenCode Go 额度接口 HTTP ${response.status}`)
  const data = await response.json()
  const usage = data?.usage
  if (usage === null || typeof usage !== 'object' || Array.isArray(usage)) throw new Error('OpenCode Go 响应缺少 usage')
  return {
    rolling: normalizeGoWindow(usage.rolling),
    weekly: normalizeGoWindow(usage.weekly),
    monthly: normalizeGoWindow(usage.monthly),
  }
}

async function queryOpenRouter(ctx) {
  const { credential } = await resolveProviderCredential(ctx, ['openrouter'], ['OPENROUTER_API_KEY'])
  if (credential === null) throw unavailable('未找到 OpenRouter 凭据')
  const response = await fetchResponse(OPENROUTER_URL, { headers: { authorization: `Bearer ${credential}` } })
  if (response.status === 401 || response.status === 403) throw unavailable('OpenRouter 凭据无效或无 Key 信息权限')
  if (!response.ok) throw new Error(`OpenRouter Key 接口 HTTP ${response.status}`)
  return normalizeOpenRouterKey(await response.json())
}

async function queryMoonshot(ctx, region) {
  const china = region === 'cn'
  const providerIds = china ? ['moonshotai-cn'] : ['moonshotai']
  const fallbackRefs = china
    ? ['MOONSHOT_CN_API_KEY', 'MOONSHOT_API_KEY']
    : ['MOONSHOT_API_KEY']
  const { credential } = await resolveProviderCredential(ctx, providerIds, fallbackRefs)
  if (credential === null) throw unavailable(`未找到 Kimi ${china ? '中国站' : '国际站'}凭据`)
  const response = await fetchResponse(china ? MOONSHOT_CN_URL : MOONSHOT_URL, {
    headers: { authorization: `Bearer ${credential}` },
  })
  if (response.status === 401 || response.status === 403) throw unavailable(`Kimi ${china ? '中国站' : '国际站'}凭据无效或无余额查询权限`)
  if (!response.ok) throw new Error(`Kimi 余额接口 HTTP ${response.status}`)
  return normalizeMoonshotBalance(await response.json())
}

async function querySiliconFlow(ctx) {
  const { credential, profile } = await resolveProviderCredential(ctx, ['siliconflow', 'siliconflow-cn'], ['SILICONFLOW_API_KEY'])
  if (credential === null) throw unavailable('未找到 SiliconFlow 凭据')
  const endpoint = siliconFlowEndpoint(profile?.baseURL)
  if (endpoint === null) throw unavailable('当前 SiliconFlow Base URL 不是官方端点，已拒绝发送凭据')
  const response = await fetchResponse(endpoint, { headers: { authorization: `Bearer ${credential}` } })
  if (response.status === 401 || response.status === 403) throw unavailable('SiliconFlow 凭据无效或无用户信息权限')
  if (!response.ok) throw new Error(`SiliconFlow 用户信息接口 HTTP ${response.status}`)
  return normalizeSiliconFlowBalance(await response.json())
}

export function createSignalResourceService(ctx) {
  let state = initialState()
  const resourceInFlight = new Map()
  let analytics = unavailableAnalytics('尚未读取 DSH 会话用量')
  let analyticsInFlight

  const resources = {
    deepseek: { key: 'balance', ttl: BALANCE_TTL, query: () => queryDeepSeekBalance(ctx) },
    opencode: { key: 'go', ttl: GO_TTL, query: () => queryOpenCodeGo(ctx) },
    openrouter: { key: 'openrouter', ttl: DIRECT_RESOURCE_TTL, query: () => queryOpenRouter(ctx) },
    moonshot: { key: 'moonshot', ttl: DIRECT_RESOURCE_TTL, query: () => queryMoonshot(ctx, 'global') },
    'moonshot-cn': { key: 'moonshotCn', ttl: DIRECT_RESOURCE_TTL, query: () => queryMoonshot(ctx, 'cn') },
    siliconflow: { key: 'siliconflow', ttl: DIRECT_RESOURCE_TTL, query: () => querySiliconFlow(ctx) },
  }

  const stamp = () => {
    state.updatedAt = Math.max(...Object.values(resources).map(resource => Number(state[resource.key]?.attemptedAt) || 0))
  }

  const ensureSource = async (source, force) => {
    const resource = resources[source]
    if (resource === undefined) throw new Error('未知资源源')
    const current = state[resource.key]
    if (!force && current.status === 'ok' && current.fetchedAt > 0 && now() - current.fetchedAt < resource.ttl) return
    const active = resourceInFlight.get(source)
    if (active !== undefined) return active
    const task = resource.query().then(value => {
      const fetchedAt = now()
      state[resource.key] = { status: 'ok', message: '', fetchedAt, attemptedAt: fetchedAt, ...value }
      stamp()
    }, error => {
      const attemptedAt = now()
      state[resource.key] = {
        ...state[resource.key],
        status: error?.unavailable === true ? 'unavailable' : 'error',
        message: messageOf(error),
        attemptedAt,
      }
      stamp()
    }).finally(() => {
      if (resourceInFlight.get(source) === task) resourceInFlight.delete(source)
    })
    resourceInFlight.set(source, task)
    return task
  }

  const ensureAnalytics = async force => {
    if (!force && analytics.status === 'ok' && analytics.generatedAt > 0 && now() - analytics.generatedAt < ANALYTICS_TTL) return
    if (analyticsInFlight !== undefined) return analyticsInFlight
    const task = queryUsageAnalytics(ctx).then(value => {
      if (value.status === 'ok' || analytics.lastSuccessfulAt <= 0) {
        analytics = value
      } else {
        analytics = {
          ...analytics,
          status: value.status,
          message: value.message,
          attemptedAt: value.attemptedAt,
          stale: true,
        }
      }
    }, error => {
      const attemptedAt = now()
      const message = `读取 DSH 会话用量失败：${messageOf(error)}`
      analytics = analytics.lastSuccessfulAt > 0
        ? { ...analytics, status: 'error', message, attemptedAt, stale: true }
        : { ...unavailableAnalytics(message, attemptedAt), status: 'error' }
    }).finally(() => {
      if (analyticsInFlight === task) analyticsInFlight = undefined
    })
    analyticsInFlight = task
    return task
  }

  return {
    async getState() {
      await Promise.all([ensureSource('deepseek', false), ensureSource('opencode', false)])
      return clone(state)
    },

    async refreshSource(source) {
      if (source === 'all') await Promise.all(Object.keys(resources).map(key => ensureSource(key, true)))
      else await ensureSource(source, true)
      return clone(state)
    },

    async getAnalytics() {
      await ensureAnalytics(false)
      return clone(analytics)
    },

    async refreshAnalytics() {
      await ensureAnalytics(true)
      return clone(analytics)
    },
  }
}

function markRemoteMethod(instance, method) {
  const context = {
    private: false,
    static: false,
    name: method,
    addInitializer(initializer) {
      initializer.call(instance)
    },
  }
  Remote(method)(undefined, context)
}

export class SignalResourceService {
  constructor(ctx) {
    this.implementation = createSignalResourceService(ctx)
    this.typertRemote = bindTypertRemote(this, 'signalResource')
    markRemoteMethod(this, 'getState')
    markRemoteMethod(this, 'refreshSource')
    markRemoteMethod(this, 'getAnalytics')
    markRemoteMethod(this, 'refreshAnalytics')
  }

  getState() {
    return this.implementation.getState()
  }

  refreshSource(source) {
    return this.implementation.refreshSource(source)
  }

  getAnalytics() {
    return this.implementation.getAnalytics()
  }

  refreshAnalytics() {
    return this.implementation.refreshAnalytics()
  }
}

export function apply(ctx) {
  const service = new SignalResourceService(ctx)
  ctx.provide('signalResource', service)
  console.log('[dsh-signal] Signal Hero、资源与本地用量服务已加载')
}
