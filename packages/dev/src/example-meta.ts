import path from 'node:path'

import {
  groupBy,
  sortBy,
} from 'lodash-es'

import { vfs } from './virtual-file-system'

export interface ExampleMeta {
  examples: Example[]
}

interface ExampleFile {
  path: string
  hidden: boolean
}

export interface Example {
  name: string
  framework: string
  story: string
  files: ExampleFile[]
}

export async function readExampleMeta(): Promise<ExampleMeta> {
  const file = await vfs.getFile(metaPath)
  return (await file.readJSON()) as ExampleMeta
}

export async function writeExampleMeta(meta: ExampleMeta) {
  const yamlFile = await vfs.getFile(metaPath)
  yamlFile.updateJSON(meta)
}

export function sortExamples(examples: Example[]) {
  const prefixOrder = [
    'react',
    'vue',
    'preact',
    'svelte',
    'solid',
    'lit',
    'vanilla',
  ]
  const group = groupBy(examples, (example) => example.framework)

  const sorted = prefixOrder.flatMap((prefix) =>
    sortBy(group[prefix], (example) => {
      if (example.name.endsWith('minimal')) {
        // Put minimal examples first
        return '0' + example.name
      } else {
        return '1' + example.name
      }
    })
  )

  if (sorted.length !== examples.length) {
    throw new Error('Missing example prefix')
  }

  return sorted
}

// Put important files first
export function sortFiles<T extends { path: string }>(files: T[]): T[] {
  return sortBy(files, (file) => {
    const name = file.path.split('/').at(-1) || ''

    if (name.includes('editor')) return 1
    if (name.includes('extension')) return 2
    if (name.includes('toolbar')) return 3
    if (name.includes('button')) return 9
    return 5
  })
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

const metaPath = path.join('website', 'example.meta.json')
