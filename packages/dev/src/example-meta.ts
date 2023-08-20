import path from 'node:path'

import { vfs } from './virtual-file-system.js'

export interface ExampleMeta {
  examples: Example[]
}

interface ExampleFile {
  path: string
  hidden: boolean
}

export interface Example {
  name: string
  order: number
  files: ExampleFile[]
}

export async function readExampleMeta(): Promise<ExampleMeta> {
  const file = await vfs.getFile(metaJsonPath)
  return (await file.readYaml()) as ExampleMeta
}

export async function writeExampleMeta(meta: ExampleMeta) {
  meta.examples.sort((a, b) => a.order - b.order)
  const file = await vfs.getFile(metaJsonPath)
  file.updateYaml(meta)
}

export function findExample(meta: ExampleMeta, name: string) {
  return meta.examples.find((c) => c.name === name)
}

export function findExampleFile(
  meta: ExampleMeta,
  name: string,
  filePath: string,
) {
  const collection = findExample(meta, name)
  return collection?.files?.find((f) => f.path === filePath)
}

const metaJsonPath = path.join('playground', 'example.meta.yaml')
