import path, { basename } from 'node:path'
import { fileURLToPath } from 'node:url'

import { type ExampleMeta, readExampleMeta } from './example-meta.js'
import { findRootDir } from './find-root-dir.js'
import { writeText } from './write-text.js'

// TODO: use vfs
export async function genExampleIndex() {
  const meta = await readExampleMeta()
  const indexPath = path.join(await findRootDir(), 'website', 'examples.md')
  const markdown = formatIndexMarkdown(meta)
  await writeText(indexPath, markdown)
}

function formatIndexMarkdown(meta: ExampleMeta) {
  const lines: string[] = []
  for (const collection of meta.collections) {
    if (collection.stories.length === 0) continue

    lines.push(`## ${collection.name}`)
    for (const story of collection.stories) {
      lines.push(
        `- [${story.name}](./examples/${collection.name}-${story.name})`,
      )
    }
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
