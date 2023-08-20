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
  const examples: {
    [exampleName: string]: {
      [fileName: string]: { hidden: boolean; code: string }
    }
  } = {}

  for (const example of meta.examples) {
    examples[example.name] = {}
    for (const file of example.files) {
      const importFilePath = path.join(
        '../../playground/examples',
        example.name,
        file.path,
      )
      importFilePaths.push(importFilePath)
      examples[example.name]['/' + file.path] = {
        hidden: file.hidden,
        code: EDGE_REMOVER + `modules['${importFilePath}']` + EDGE_REMOVER,
      }
    }
  }

  const importFilePathsString = JSON.stringify(importFilePaths, null, 2)
  const storiesString = JSON.stringify(examples, null, 2)

  const code =
    `
// This file is generated from ${currentFilename}

const modules = import.meta.glob(${importFilePathsString}, { as: 'raw', eager: true }) as Record<string, string>

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
