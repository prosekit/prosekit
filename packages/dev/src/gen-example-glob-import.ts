import path, { basename } from 'node:path'
import { fileURLToPath } from 'node:url'

import { readExampleMeta } from './example-meta.js'
import { sortObject } from './sort-object.js'
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

  for (const [collectionName, collection] of Object.entries(sortObject(meta))) {
    const sharedStoryFiles: Record<string, { hidden: boolean; code: string }> =
      {}

    for (const [sharedFilePath, sharedFile] of Object.entries(
      sortObject(collection.sharedFiles),
    )) {
      const importFilePath = path.join(
        '../../examples',
        collectionName,
        sharedFilePath,
      )
      importFilePaths.push(importFilePath)
      sharedStoryFiles['/' + sharedFilePath] = {
        hidden: sharedFile.hidden,
        code: EDGE_REMOVER + `modules['${importFilePath}']` + EDGE_REMOVER,
      }
    }

    for (const [storyName, story] of Object.entries(
      sortObject(collection.stories),
    )) {
      const storyFiles = { ...sharedStoryFiles }

      for (const [storyFilePath, storyFile] of Object.entries(
        sortObject(story.files),
      )) {
        const importFilePath = path.join(
          '../../examples',
          collectionName,
          'src',
          storyName,
          storyFilePath,
        )
        importFilePaths.push(importFilePath)
        storyFiles['/' + storyFilePath] = {
          hidden: storyFile.hidden,
          code: EDGE_REMOVER + `modules['${importFilePath}']` + EDGE_REMOVER,
        }
      }
      stories[collectionName + '/' + storyName] = storyFiles
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
