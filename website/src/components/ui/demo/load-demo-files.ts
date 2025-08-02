import fs from 'node:fs/promises'
import path from 'node:path'

import memoize from 'just-memoize'

import { exampleMeta } from '../../../../example.meta'

import { replaceClassNames } from './replace-class-names'

async function loadDemoFileImpl(
  framework: string,
  story: string,
  fileName: string,
) {
  const filePath = path.join(process.cwd(), 'src', 'examples', framework, story, fileName)
  const fileContent = await fs.readFile(filePath, 'utf-8')
  return ({
    title: fileName,
    code: replaceClassNames(fileContent),
    lang: (fileName.split('.').pop() || 'plaintext') as 'plaintext',
  })
}

async function loadDemoFilesImpl(
  { framework, story }: { framework: string; story: string },
) {
  const example = exampleMeta.examples.find(example => example.story === story && example.framework === framework)
  if (!example) {
    throw new Error(`Unable to find example for story ${story} and framework ${framework}`)
  }
  return await Promise.all(example.files.map(file => loadDemoFileImpl(framework, story, file.path)))
}

export const loadDemoFiles = memoize(loadDemoFilesImpl)
