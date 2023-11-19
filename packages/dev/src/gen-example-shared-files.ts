import path from 'node:path'

import { sortBy, uniq } from 'lodash-es'

import { readExampleMeta } from './example-meta.js'
import { vfs, type VirtualFile } from './virtual-file-system.js'

const sharedFiles = [
  'ToggleButton.vue',
  'ToggleButton.tsx',
  'ImageUploadPopover.tsx',
  'ImageUploadPopover.vue',
  'SlashMenu.vue',
  'SlashMenu.tsx',
]

export async function genExampleSharedFiles() {
  const meta = await readExampleMeta()
  const frameworks = uniq(
    meta.examples.map((example) => example.name.split('-')[0]),
  )
  for (const framework of frameworks) {
    for (const file of sharedFiles) {
      await cloneSharedFile(framework, file)
    }
  }
}

async function cloneSharedFile(framework: string, sharedFile: string) {
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

  const contentSet = new Set(files.map((file) => file.content))
  if (contentSet.size <= 1) {
    return
  }

  const sorted = sortBy(files, (f) => -f.time)
  const expectedContent = sorted[0].content

  for (const file of files) {
    file.file.update(expectedContent)
  }
}
