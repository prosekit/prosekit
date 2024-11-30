import path, { basename } from 'node:path'
import { fileURLToPath } from 'node:url'

import { uniq } from 'lodash-es'

import {
  readExampleMeta,
  type ExampleMeta,
} from './example-meta.js'
import { vfs } from './virtual-file-system.js'

export async function genExampleIndex() {
  const meta = await readExampleMeta()
  const indexFile = await vfs.getFile(path.join('website', 'examples.md'))
  const markdown = formatIndexMarkdown(meta)
  indexFile.update(markdown)
}

function formatIndexMarkdown(meta: ExampleMeta) {
  const stories = uniq(meta.examples.map((example) => example.story)).sort()
  const lines = stories.map((story) => `- [${story}](./examples/${story})`)

  return (
    `

<!-- This file is generated from ${currentFilename} -->

# Examples

${lines.join('\n\n')}

`.trim() + '\n'
  )
}

const currentFilename = basename(fileURLToPath(import.meta.url))
