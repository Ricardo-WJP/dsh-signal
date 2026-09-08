import { readFile, writeFile } from 'node:fs/promises'
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

const output = (await Promise.all(fragments.map(name => readFile(resolve(sourceRoot, name), 'utf8')))).join('\n')
if (!output.includes("id: 'dsh-signal'")) throw new Error('Signal client entry is missing')
if (output.includes('DSH Signal embedded dsh-codex-connect client') || output.includes('DSH Signal embedded dsh-agy-link client') || output.includes('DSH Signal embedded dsh-llm-grok client')) {
  throw new Error('Legacy embedded browser clients must not be included in the Signal client')
}
await writeFile(outputPath, output)
console.log(`built ${outputPath} (${Buffer.byteLength(output)} bytes from ${fragments.length} fragments)`)
