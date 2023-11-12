import path, { basename } from 'node:path'
import { fileURLToPath } from 'node:url'

import { readExampleMeta, type ExampleMeta } from './example-meta.js'
import { vfs } from './virtual-file-system.js'

export async function genExampleIndex() {
  const meta = await readExampleMeta()
  const indexFile = await vfs.getFile(path.join('website', 'examples.md'))
  const markdown = formatIndexMarkdown(meta)
  indexFile.update(markdown)
}

function formatIndexMarkdown(meta: ExampleMeta) {
  const lines: string[] = []
  for (const example of meta.examples) {
    lines.push(`- [${example.name}](./examples/${example.name})`)
  }

  return (
    `

<!-- This file is generated from ${currentFilename} -->

# Examples

${lines.join('\n\n')}

`.trim() + '\n'
  )
}

const currentFilename = basename(fileURLToPath(import.meta.url))
