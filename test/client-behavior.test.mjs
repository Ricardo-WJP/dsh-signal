import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import test from 'node:test'
import vm from 'node:vm'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))

async function evaluatePrefix(relativePath, marker, exportNames) {
  const source = await readFile(join(root, relativePath), 'utf8')
  const markerIndex = source.indexOf(marker)
  assert.notEqual(markerIndex, -1, `${relativePath} no longer has the expected top-level prefix marker: ${marker}`)
  const prefix = source.slice(0, markerIndex)
  const context = vm.createContext({})
  const exportExpression = exportNames.map(name => `${name}: ${name}`).join(', ')
  vm.runInContext(`${prefix}\nglobalThis.__selected = { ${exportExpression} }`, context, {
    filename: relativePath,
  })
  return context.__selected
}

const resourceFunctions = evaluatePrefix(
  'src/client/20-resource.js',
  '\n    async function companionJson',
  ['normalizedPercent', 'normalizedAmount', 'primaryGoWindow', 'normalizeCodexStatus'],
)

const explainerFunctions = evaluatePrefix(
  'src/client/50-explainer.js',
  '\n    function WorkExplainer',
  ['workToolDescriptor'],
)

function toHostValue(value) {
  return JSON.parse(JSON.stringify(value))
}

test('resource normalizers reject null, blank, and boolean values while accepting zero and numeric strings', async () => {
  const { normalizedPercent, normalizedAmount } = await resourceFunctions

  for (const normalize of [normalizedPercent, normalizedAmount]) {
    assert.equal(normalize(null), null)
    assert.equal(normalize(''), null)
    assert.equal(normalize('   '), null)
    assert.equal(normalize(false), null)
    assert.equal(normalize(true), null)
    assert.equal(normalize(0), 0)
    assert.equal(normalize('0'), 0)
    assert.equal(normalize('12.5'), 12.5)
  }
  assert.equal(normalizedPercent('100'), 100)
  assert.equal(normalizedPercent('101'), null)
  assert.equal(normalizedAmount('-1'), null)
})

test('primaryGoWindow skips windows with empty or invalid percentages', async () => {
  const { primaryGoWindow } = await resourceFunctions
  const monthly = { percent: '25', resetsAt: '2026-09-30T00:00:00Z' }
  assert.deepEqual(toHostValue(primaryGoWindow({
    rolling: { percent: '' },
    weekly: { percent: false },
    monthly,
  })), ['本月', monthly])

  const zero = { percent: 0 }
  assert.deepEqual(toHostValue(primaryGoWindow({ rolling: zero })), ['5 小时', zero])
  assert.equal(primaryGoWindow({ rolling: { percent: null }, weekly: { percent: true } }), null)
})

test('normalizeCodexStatus does not retain quota data after logout', async () => {
  const { normalizeCodexStatus } = await resourceFunctions
  const loggedOut = await normalizeCodexStatus({
    status: 'signed-out',
    usage: {
      rateLimits: [{ id: 'codex', windows: [{ windowSeconds: 18000, remainingPercent: 88 }] }],
      credits: { balance: 42 },
    },
  }, 1725552000000)
  assert.equal(loggedOut.status, 'unavailable')
  assert.equal(loggedOut.connected, false)
  assert.equal(loggedOut.fetchedAt, 0)
  assert.equal(loggedOut.attemptedAt, 1725552000000)
  assert.deepEqual(toHostValue(loggedOut.rateLimits), [])
  assert.equal(loggedOut.credits, null)
})

test('workToolDescriptor maps the supported tool categories by their actual tool names', async () => {
  const { workToolDescriptor } = await explainerFunctions
  const cases = [
    ['view_image', '正在处理素材', '处理图片 / 文档'],
    ['read_file', '正在查找资料', '读取 / 搜索文件'],
    ['write_file', '正在修改内容', '修改文件'],
    ['exec_command', '正在运行命令', '运行命令'],
    ['web__run', '正在查看网页', '浏览 / 验证网页'],
  ]
  for (const [toolName, title, label] of cases) {
    const descriptor = workToolDescriptor(toolName)
    assert.equal(descriptor.title, title, toolName)
    assert.equal(descriptor.label, label, toolName)
    assert.equal(typeof descriptor.detail, 'string')
    assert.ok(descriptor.detail.length > 0, toolName)
  }
})
