import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const sourceRoot = resolve(root, 'src', 'client')
const outputPath = resolve(root, 'lib', 'client.js')
const fragments = [
  '00-shell.js',
  '10-hero.js',
  '20-resource.js',
  '30-analytics.js',
  '40-connections.js',
  '50-explainer.js',
  '60-usage.js',
  '90-entry.js',
]
const expected = (await Promise.all(fragments.map(name => readFile(resolve(sourceRoot, name), 'utf8')))).join('\n')
const actual = await readFile(outputPath, 'utf8')
if (expected !== actual) throw new Error('lib/client.js is stale; run npm run build:client')
if (actual.includes('DSH Signal embedded dsh-codex-connect client') || actual.includes('DSH Signal embedded dsh-agy-link client') || actual.includes('DSH Signal embedded dsh-llm-grok client')) {
  throw new Error('Legacy embedded browser clients are still present')
}
console.log(`verified ${outputPath} (${Buffer.byteLength(actual)} bytes)`)
