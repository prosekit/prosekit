import path, { basename } from 'node:path'
import { fileURLToPath } from 'node:url'

import { readExampleMeta } from './example-meta.js'
import { vfs } from './virtual-file-system.js'

export async function genExampleGlobImport() {
  const code = await formatCode()
  await vfs.updateText('website/components/example-glob-import.gen.ts', code)
}

async function formatCode(): Promise<string> {
  const meta = await readExampleMeta()
  const importFilePaths: string[] = []
  const stories: Record<
    string,
    Record<string, { hidden: boolean; code: string }>
  > = {}

  for (const collection of meta.collections) {
    const sharedStoryFiles: Record<string, { hidden: boolean; code: string }> =
      {}

    for (const sharedFile of collection.files) {
      const importFilePath = path.join(
        '../../examples',
        collection.name,
        sharedFile.path,
      )
      importFilePaths.push(importFilePath)
      sharedStoryFiles['/' + sharedFile.path] = {
        hidden: sharedFile.hidden,
        code: EDGE_REMOVER + `modules['${importFilePath}']` + EDGE_REMOVER,
      }
    }

    for (const story of collection.stories) {
      const storyFiles = { ...sharedStoryFiles }

      for (const storyFile of story.files) {
        const importFilePath = path.join(
          '../../examples',
          collection.name,
          'src',
          story.name,
          storyFile.path,
        )
        importFilePaths.push(importFilePath)
        storyFiles['/' + storyFile.path] = {
          hidden: storyFile.hidden,
          code: EDGE_REMOVER + `modules['${importFilePath}']` + EDGE_REMOVER,
        }
      }
      stories[collection.name + '/' + story.name] = storyFiles
    }
  }

  const importFilePathsString = JSON.stringify(importFilePaths, null, 2)
  const storiesString = JSON.stringify(stories, null, 2)

  const code =
    `
// This file is generated from ${currentFilename}

const modules = import.meta.glob(${importFilePathsString}, { as: 'raw', eager: true })

const stories = ${storiesString}

export { stories }
`.trim() + '\n'

  return removeEdges(code)
}

function removeEdges(s: string) {
  return s.replaceAll('"' + EDGE_REMOVER, '').replaceAll(EDGE_REMOVER + '"', '')
}

const EDGE_REMOVER = '/* EDGE_REMOVER_PLACEHOLDER */'

const currentFilename = basename(fileURLToPath(import.meta.url))
