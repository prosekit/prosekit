import path, { basename } from 'node:path'
import { fileURLToPath } from 'node:url'

import stringHash from '@sindresorhus/string-hash'
import { unionBy } from 'lodash-es'

import { readExampleMeta } from './example-meta.js'
import { vfs } from './virtual-file-system.js'

export async function genExampleMarkdown() {
  const sourceExamplesDir = path.join('examples')
  const destExamplesDir = path.join('website', 'examples')

  await vfs.cleanFilesInDir(destExamplesDir)

  await writeMarkdownFiles(sourceExamplesDir, destExamplesDir)
}

async function writeMarkdownFiles(
  sourceExamplesDir: string,
  destExamplesDir: string,
) {
  const meta = await readExampleMeta()

  for (const packageDir of Object.keys(meta)) {
    const framework = meta[packageDir].framework

    const rootFiles = Object.entries(meta[packageDir].sharedFiles).map(
      ([filePath, { hidden }]) => {
        const absSourcePath = path.join(sourceExamplesDir, packageDir, filePath)
        return {
          id: 'file' + String(stringHash(framework + filePath)),
          sourcePath: path.relative(destExamplesDir, absSourcePath),
          destPath: '/' + filePath,
          hidden,
        }
      },
    )

    for (const story of Object.keys(meta[packageDir].stories)) {
      const storyFiles = Object.entries(
        meta[packageDir].stories[story].files,
      ).map(([filePath, { hidden }]) => {
        const absSourcePath = path.join(
          sourceExamplesDir,
          packageDir,
          'src',
          story,
          filePath,
        )

        return {
          id: 'file' + String(stringHash(framework + story + filePath)),
          sourcePath: path.relative(destExamplesDir, absSourcePath),
          destPath: '/' + filePath,
          hidden,
        }
      })

      const files = unionBy([...storyFiles, ...rootFiles], 'destPath')

      await vfs.updateText(
        path.join(destExamplesDir, framework + '-' + story + '.md'),
        formatMarkdownCode(framework, story),
      )
      await vfs.updateText(
        path.join(destExamplesDir, framework + '-' + story + '.gen.ts'),
        formatComponentCode(files),
      )
    }
  }
}

function formatComponentCode(
  files: Array<{
    id: string
    sourcePath: string
    destPath: string
    hidden: boolean
  }>,
): string {
  return (
    `
/* eslint-disable */

// This file is generated from ${currentFilename}

import { defineComponent, h } from 'vue'
import { SandpackBlock } from '../components/sandpack-block'

${files
  .map((file) => `import ${file.id} from '${file.sourcePath}?raw'`)
  .join('\n')}

const files = {
${files
  .map((file) => {
    return `  '${file.destPath}': { hidden: ${file.hidden}, code: ${file.id} }`
  })
  .join(',\n')}
}

export const StoryBlock = defineComponent(() => {
  return () => h(SandpackBlock, { files })
})
`.trim() + '\n'
  )
}

function formatMarkdownCode(framework: string, story: string): string {
  return (
    `
---
layout: page
---

<!-- This file is generated from ${currentFilename} -->

<script setup>
import { StoryBlock } from './${framework}-${story}.gen'
</script>

<StoryBlock :expand="true" />
`.trim() + '\n'
  )
}

const currentFilename = basename(fileURLToPath(import.meta.url))
