import path from 'node:path'

import { sortBy, uniq } from 'lodash-es'

import { readExampleMeta } from './example-meta.js'
import { vfs, type VirtualFile } from './virtual-file-system.js'

/**
 * A list of shared files that are used by multiple examples.
 *
 * If a file is prefixed with `*`, it is a shared file that can be used by all
 * frameworks. Otherwise, it is a shared file that is used by examples with the
 * same framework.
 */
const frameworkSharedFiles = [
  '*user-data.ts',
  '*tag-data.ts',
  '*issue-link.ts',

  'use-readonly.ts',
  'use-submit-keymap.ts',

  'button.vue',
  'button.tsx',
  'button.svelte',

  'block-handle.tsx',
  'block-handle.vue',
  'block-handle.svelte',

  'image-upload-popover.tsx',
  'image-upload-popover.vue',

  'language-selector.tsx',
  'language-selector.vue',

  'code-block-view.tsx',
  'code-block-view.vue',

  'slash-menu.tsx',
  'slash-menu.vue',
  'slash-menu.svelte',

  'user-menu.tsx',
  'user-menu.vue',

  'tag-menu.tsx',
  'tag-menu.vue',
]

export async function genExampleSharedFiles() {
  const meta = await readExampleMeta()
  const frameworks = uniq(
    meta.examples.map((example) => example.name.split('-')[0]),
  )
  for (const file of frameworkSharedFiles) {
    const found = await cloneSharedFile(frameworks, file)

    if (!found) {
      console.warn(
        `[gen-example-shared-files] Cannot found shared file: ${file}`,
      )
    }
  }
}

async function cloneSharedFile(frameworks: string[], sharedFile: string) {
  if (sharedFile.startsWith('*')) {
    return await cloneSharedFileInFramwork(null, sharedFile.slice(1))
  }

  let found = false
  for (const framework of frameworks) {
    if (await cloneSharedFileInFramwork(framework, sharedFile)) {
      found = true
    }
  }
  return found
}

async function cloneSharedFileInFramwork(
  framework: string | null,
  sharedFile: string,
): Promise<boolean> {
  const meta = await readExampleMeta()
  const files: Array<{
    file: VirtualFile
    content: string
    time: number
  }> = []

  for (const example of meta.examples) {
    if (!framework || example.name.split('-')[0] === framework) {
      for (const f of example.files) {
        if (f.path === sharedFile) {
          const filePath = path.join(
            'playground',
            'examples',
            example.framework,
            example.story,
            sharedFile,
          )
          const file = await vfs.getFile(filePath)
          const time = await file.getLastUpdateTime()
          const content = await file.read()
          files.push({ file, time, content })
        }
      }
    }
  }

  if (files.length === 0) {
    return false
  }

  const contentSet = new Set(files.map((file) => file.content))
  if (contentSet.size <= 1) {
    return true
  }

  const sorted = sortBy(files, (f) => -f.time)
  const expectedContent = sorted[0].content

  for (const file of files) {
    file.file.update(expectedContent)
  }

  return true
}
