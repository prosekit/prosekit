import path from 'node:path'

import { sortBy, uniq } from 'lodash-es'

import { readExampleMeta } from './example-meta.js'
import { vfs, type VirtualFile } from './virtual-file-system.js'

const sharedFiles = [
  'use-readonly.ts',

  'toggle.vue',
  'toggle.tsx',
  'toggle.svelte',

  'image-upload-popover.tsx',
  'image-upload-popover.vue',
  'image-upload-popover.svelte',

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
  for (const file of sharedFiles) {
    let found = false

    for (const framework of frameworks) {
      if (await cloneSharedFile(framework, file)) {
        found = true
      }
    }

    if (!found) {
      console.warn(
        `[gen-example-shared-files] Cannot found shared file: ${file}`,
      )
    }
  }
}

async function cloneSharedFile(
  framework: string,
  sharedFile: string,
): Promise<boolean> {
  const meta = await readExampleMeta()
  const files: Array<{
    file: VirtualFile
    content: string
    time: number
  }> = []

  for (const example of meta.examples) {
    if (example.name.split('-')[0] === framework) {
      for (const f of example.files) {
        if (f.path === sharedFile) {
          const filePath = path.join(
            'playground',
            'examples',
            example.name,
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
