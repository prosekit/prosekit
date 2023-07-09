import path from 'node:path'

import { vfs } from './virtual-file-system.js'

export interface ExampleMeta {
  [packageDir: string]: {
    framework: string
    dependencies: Record<string, string>
    devDependencies: Record<string, string>
    sharedFiles: {
      [filePath: string]: {
        hidden: boolean
      }
    }
    stories: {
      [story: string]: {
        files: {
          [filePath: string]: {
            hidden: boolean
          }
        }
      }
    }
  }
}

export async function readExampleMeta(): Promise<ExampleMeta> {
  const file = await vfs.getFile(metaJsonPath)
  return (await file.readJSON()) as ExampleMeta
}

export async function writeExampleMeta(meta: ExampleMeta) {
  const file = await vfs.getFile(metaJsonPath)
  file.updateJSON(meta)
}

const metaJsonPath = path.join('examples', 'example.meta.json')
