import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import test from 'node:test'
import vm from 'node:vm'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const source = await readFile(join(root, 'src/client/90-entry.js'), 'utf8')
const prefix = source.slice(0, source.indexOf('    async function apply'))
const context = vm.createContext({})
vm.runInContext(`${prefix}\nglobalThis.__selected = { createRefreshPolicy, createRefreshScheduler, mergeResourceState, mergeHostState }`, context, {
  filename: 'src/client/90-entry.js',
})
const { createRefreshPolicy, createRefreshScheduler, mergeResourceState, mergeHostState } = context.__selected

test('refresh policy throttles automatic triggers and backs off failures with a fake clock', () => {
  let now = 0
  const policy = createRefreshPolicy({ now: () => now, interval: 45_000, throttle: 8_000, backoff: [60_000, 120_000] })

  assert.equal(policy.shouldStart('codex', true), true)
  policy.markStarted('codex')
  assert.equal(policy.shouldStart('codex', true), false)
  assert.equal(policy.shouldStart('codex', false), true)

  now = 8_000
  assert.equal(policy.shouldStart('codex', true), true)
  policy.markFailure('codex')
  assert.equal(policy.shouldStart('codex', true), false)
  assert.equal(policy.delay('codex'), 60_000)

  now = 68_000
  assert.equal(policy.shouldStart('codex', true), true)
  assert.equal(policy.delay('codex'), 45_000)
  policy.markSuccess('codex')
  assert.equal(policy.delay('codex'), 45_000)
})

test('visible scheduler stops in background and refreshes on return using fake timers', async () => {
  let visible = true
  let nextId = 0
  const timers = new Map()
  const calls = []
  const scheduler = createRefreshScheduler({
    setTimeout(callback, delay) {
      const id = ++nextId
      timers.set(id, { callback, delay })
      return id
    },
    clearTimeout(id) {
      timers.delete(id)
    },
    isVisible: () => visible,
    getDelay: () => 45_000,
    refresh: reason => calls.push(reason),
  })

  scheduler.start()
  assert.deepEqual([...timers.values()].map(timer => timer.delay), [45_000])
  const first = [...timers.entries()][0][0]
  const firstTimer = timers.get(first)
  timers.delete(first)
  firstTimer.callback()
  await Promise.resolve()
  await Promise.resolve()
  assert.deepEqual(calls, ['interval'])
  assert.equal(timers.size, 1)

  visible = false
  scheduler.onVisibility()
  assert.equal(timers.size, 0)
  visible = true
  scheduler.onVisibility()
  await Promise.resolve()
  await Promise.resolve()
  assert.deepEqual(calls, ['interval', 'visibility'])
  assert.equal(timers.size, 1)
  scheduler.stop()
  assert.equal(timers.size, 0)
})

test('source refresh merge keeps a concurrent source and its verified Codex snapshot', () => {
  const current = {
    balance: { status: 'ok', attemptedAt: 100 },
    go: { status: 'ok', attemptedAt: 200 },
    codex: { status: 'ok', attemptedAt: 300 },
    updatedAt: 300,
  }
  const response = {
    balance: { status: 'ok', attemptedAt: 100 },
    go: { status: 'ok', attemptedAt: 400 },
    codex: { status: 'unavailable', attemptedAt: 50 },
    updatedAt: 400,
  }
  const merged = mergeResourceState(current, response, 'opencode')
  assert.equal(merged.go.attemptedAt, 400)
  assert.equal(merged.balance.attemptedAt, 100)
  assert.equal(merged.codex.attemptedAt, 300)

  const staleFullRead = {
    balance: { status: 'ok', attemptedAt: 90 },
    go: { status: 'ok', attemptedAt: 150 },
    updatedAt: 150,
  }
  const fullMerged = mergeHostState(current, staleFullRead)
  assert.equal(fullMerged.balance.attemptedAt, 100)
  assert.equal(fullMerged.go.attemptedAt, 200)
  assert.equal(fullMerged.codex.attemptedAt, 300)
})
