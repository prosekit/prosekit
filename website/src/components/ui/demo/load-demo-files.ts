import fs from 'node:fs/promises'
import path from 'node:path'

import { findRoot } from '@manypkg/find-root'
import memoize from 'just-memoize'
import examples from 'prosekit-registry/examples.gen.json'

import { replaceClassNames } from './replace-class-names'

const rootDir: string = (await findRoot(process.cwd())).rootDir

async function loadDemoFileImpl(
  filePath: string,
) {
  const absFilePath = path.join(rootDir, filePath)
  const fileContent = await fs.readFile(absFilePath, 'utf-8')
  return ({
    title: filePath,
    code: replaceClassNames(fileContent, absFilePath),
    lang: (absFilePath.split('.').pop() || 'plaintext') as 'plaintext',
  })
}

async function loadDemoFilesImpl(
  { framework, story }: { framework: string; story: string },
) {
  const exampleKey = `${framework}-example-${story}`
  const example = examples.examples[exampleKey as keyof typeof examples.examples]
  if (!example) {
    throw new Error(`Unable to find example for story ${story} and framework ${framework}`)
  }
  const codes = await Promise.all(example.files.map(file => loadDemoFileImpl(file)))
  const commonPrefix = findCommonPrefix(example.files)

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
