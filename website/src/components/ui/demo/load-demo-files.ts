import fs from 'node:fs/promises'
import path from 'node:path'

import memoize from 'just-memoize'
import registry from 'prosekit-registry/registry.gen.json'

import { replaceClassNames } from './replace-class-names'

async function loadDemoFileImpl(
  filePath: string,
) {
  const absFilePath = path.join(process.cwd(), '..', filePath)
  const fileContent = await fs.readFile(absFilePath, 'utf-8')
  return ({
    title: filePath,
    code: replaceClassNames(fileContent),
    lang: (absFilePath.split('.').pop() || 'plaintext') as 'plaintext',
  })
}

async function loadDemoFilesImpl(
  { framework, story }: { framework: string; story: string },
) {
  const example = registry.items.find(item => item.name === `${framework}-example-${story}`)
  if (!example) {
    throw new Error(`Unable to find example for story ${story} and framework ${framework}`)
  }
  const codes = await Promise.all(example.meta.accumulatedFiles.map(file => loadDemoFileImpl(file)))
  const commonPrefix = findCommonPrefix(example.meta.accumulatedFiles)

  return codes.map(code => ({
    ...code,
    title: code.title.slice(commonPrefix.length),
  }))
}

function findCommonPrefix(filePaths: string[]): string {
  if (filePaths.length === 0) {
    return ''
  }
  const firstPath = filePaths[0]
  const chunks = firstPath.split('/')
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i]
    for (let j = 1; j < filePaths.length; j++) {
      const filePath = filePaths[j]
      const filePathChunks = filePath.split('/')
      if (filePathChunks[i] !== chunk) {
        return chunks.slice(0, i).join('/') + '/'
      }
    }
  }
  return chunks[chunks.length - 1]
}

export const loadDemoFiles = memoize(loadDemoFilesImpl)
