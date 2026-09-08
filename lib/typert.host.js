import { z } from 'zod'

const finite = z.number().finite()
const nonnegative = finite.nonnegative()
const status = z.enum(['idle', 'loading', 'ok', 'unavailable', 'error'])
const windowSchema = z.union([
  z.object({ percent: finite, resetsAt: z.string() }),
  z.null(),
])

const walletSchema = z.object({
  status,
  message: z.string(),
  fetchedAt: finite,
  attemptedAt: finite,
  currency: z.string(),
  totalBalance: finite,
  grantedBalance: finite,
  toppedUpBalance: finite,
})

export const stateSchema = z.object({
  updatedAt: finite,
  balance: walletSchema,
  go: z.object({
    status,
    message: z.string(),
    fetchedAt: finite,
    attemptedAt: finite,
    rolling: windowSchema,
    weekly: windowSchema,
    monthly: windowSchema,
  }),
  openrouter: z.object({
    status,
    message: z.string(),
    fetchedAt: finite,
    attemptedAt: finite,
    currency: z.string(),
    usage: finite,
    usageDaily: finite,
    usageWeekly: finite,
    usageMonthly: finite,
    limit: z.union([finite, z.null()]),
    limitRemaining: z.union([finite, z.null()]),
    limitReset: z.string(),
    freeTier: z.boolean(),
  }),
  moonshot: walletSchema,
  moonshotCn: walletSchema,
  siliconflow: walletSchema,
})

const usageTotalsSchema = z.object({
  total: nonnegative,
  input: nonnegative,
  output: nonnegative,
  cacheRead: nonnegative,
  cacheWrite: nonnegative,
  reasoning: nonnegative,
})

const breakdownSchema = z.object({
  id: z.string(),
  total: nonnegative,
  requests: nonnegative,
})

export const analyticsSchema = z.object({
  status: z.enum(['ok', 'unavailable', 'error']),
  message: z.string(),
  generatedAt: nonnegative,
  attemptedAt: nonnegative,
  lastSuccessfulAt: nonnegative,
  stale: z.boolean(),
  rangeStart: z.string(),
  rangeEnd: z.string(),
  coverageStart: z.string(),
  reasoningReported: z.boolean(),
  sessionCount: nonnegative,
  skippedSessions: nonnegative,
  activeDays: nonnegative,
  requestCount: nonnegative,
  totals: usageTotalsSchema,
  daily: z.array(z.object({
    date: z.string(),
    total: nonnegative,
    input: nonnegative,
    output: nonnegative,
    cacheRead: nonnegative,
    cacheWrite: nonnegative,
    reasoning: nonnegative,
    requests: nonnegative,
  })),
  providers: z.array(breakdownSchema),
  models: z.array(breakdownSchema),
  records: z.array(z.object({
    date: z.string(),
    time: nonnegative,
    session: z.string(),
    provider: z.string(),
    model: z.string(),
    reasoningReported: z.boolean(),
    total: nonnegative,
    input: nonnegative,
    output: nonnegative,
    cacheRead: nonnegative,
    cacheWrite: nonnegative,
    reasoning: nonnegative,
  })),
})

const stateCodec = { mode: 'strict', typeSymbol: 'dsh-signal#ResourceState', schema: stateSchema }
const sourceCodec = { mode: 'strict', typeSymbol: 'dsh-signal#ResourceSource', schema: z.enum(['deepseek', 'opencode', 'openrouter', 'moonshot', 'moonshot-cn', 'siliconflow', 'all']) }
const analyticsCodec = { mode: 'strict', typeSymbol: 'dsh-signal#UsageAnalytics', schema: analyticsSchema }

export const TYPERT = {
  package: 'dsh-signal',
  face: 'host',
  schemas: [],
  invocations: [
    {
      id: 'dsh-signal#signalResource/getState',
      service: 'signalResource',
      namespace: 'signalResource',
      method: 'getState',
      invocation: { kind: 'direct' },
      parameters: [],
      result: stateCodec,
      sourceLocation: { file: 'dsh-signal/lib/index.js', line: 1, column: 1 },
    },
    {
      id: 'dsh-signal#signalResource/refreshSource',
      service: 'signalResource',
      namespace: 'signalResource',
      method: 'refreshSource',
      invocation: { kind: 'direct' },
      parameters: [
        { name: 'source', wire: 'source', source: 'json', codec: sourceCodec },
      ],
      result: stateCodec,
      sourceLocation: { file: 'dsh-signal/lib/index.js', line: 1, column: 1 },
    },
    {
      id: 'dsh-signal#signalResource/getAnalytics',
      service: 'signalResource',
      namespace: 'signalResource',
      method: 'getAnalytics',
      invocation: { kind: 'direct' },
      parameters: [],
      result: analyticsCodec,
      sourceLocation: { file: 'dsh-signal/lib/index.js', line: 1, column: 1 },
    },
    {
      id: 'dsh-signal#signalResource/refreshAnalytics',
      service: 'signalResource',
      namespace: 'signalResource',
      method: 'refreshAnalytics',
      invocation: { kind: 'direct' },
      parameters: [],
      result: analyticsCodec,
      sourceLocation: { file: 'dsh-signal/lib/index.js', line: 1, column: 1 },
    },
  ],
  model: {
    services: [
      {
        description: 'Host-only verified balances, key usage, subscription quotas, and local analytics.',
        summary: 'DSH Signal verified resource service.',
        tags: [],
        jsDoc: '/** Verified provider resource service for DSH Signal. */',
        key: 'signalResource',
        exportName: 'SignalResourceService',
        members: [
          { kind: 'method', name: 'getState', signature: 'getState(): Promise<ResourceState>', summary: 'Read cached resources, refreshing stale supported sources.', jsDoc: '/** Read verified resource state. */' },
          { kind: 'method', name: 'refreshSource', signature: 'refreshSource(source: ResourceSource): Promise<ResourceState>', summary: 'Refresh one verified resource source.', jsDoc: '/** Refresh a verified resource source. */' },
          { kind: 'method', name: 'getAnalytics', signature: 'getAnalytics(): Promise<UsageAnalytics>', summary: 'Read cached aggregate token usage from DSH session logs.', jsDoc: '/** Read privacy-preserving local usage analytics. */' },
          { kind: 'method', name: 'refreshAnalytics', signature: 'refreshAnalytics(): Promise<UsageAnalytics>', summary: 'Refresh aggregate token usage from DSH session logs.', jsDoc: '/** Refresh privacy-preserving local usage analytics. */' },
        ],
        types: [],
      },
    ],
    events: [],
    objects: [],
  },
}

export default TYPERT
