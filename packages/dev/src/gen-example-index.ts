import path, { basename } from 'node:path'
import { fileURLToPath } from 'node:url'

import { ExampleMeta, readExampleMeta } from './example-meta.js'
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
  for (const [packageDir, pkg] of Object.entries(meta)) {
    lines.push(`## ${packageDir}`)
    for (const storyName of Object.keys(pkg.stories)) {
      lines.push(`- [${storyName}](./examples/${packageDir}-${storyName})`)
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
