import path, { basename } from 'node:path'
import { fileURLToPath } from 'node:url'

import { readExampleMeta } from './example-meta.js'
import { vfs } from './virtual-file-system.js'

export async function genExampleMarkdown() {
  const destExamplesDir = path.join('website', 'examples')

  await vfs.cleanFilesInDir(destExamplesDir)

  await writeMarkdownFiles(destExamplesDir)
}

async function writeMarkdownFiles(destExamplesDir: string) {
  const meta = await readExampleMeta()

  for (const packageDir of Object.keys(meta)) {
    const framework = meta[packageDir].frameworks.sort().join(' ')

    for (const story of Object.keys(meta[packageDir].stories)) {
      await vfs.updateText(
        path.join(destExamplesDir, framework + '-' + story + '.md'),
        formatMarkdownCode(framework, story),
      )
    }
  }
}

function formatMarkdownCode(framework: string, story: string): string {
  return (
    `
---
layout: page
---

<!-- This file is generated from ${currentFilename} -->

<script setup>
import { ExamplePlaygroundLazy } from '../components/example-playground-lazy'
</script>

<ExamplePlaygroundLazy collection="${framework}" story="${story}" :expand="true" />
`.trim() + '\n'
  )
}

const currentFilename = basename(fileURLToPath(import.meta.url))
