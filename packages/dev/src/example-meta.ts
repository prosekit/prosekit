import path from 'node:path'

import { sortBy, groupBy } from 'lodash-es'

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
  files: ExampleFile[]
}

export async function readExampleMeta(): Promise<ExampleMeta> {
  const file = await vfs.getFile(metaYamlPath)
  return (await file.readYaml()) as ExampleMeta
}

export async function writeExampleMeta(meta: ExampleMeta) {
  const file = await vfs.getFile(metaYamlPath)
  file.updateYaml(meta)
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
  const group = groupBy(examples, (example) => example.name.split('-')[0])

  const sorted = prefixOrder.flatMap((prefix) =>
    sortBy(group[prefix], (example) => {
      if (example.name.endsWith('minimal')) {
        // Put minimal examples first
        return '0' + example.name
      } else {
        return '1' + example.name
      }
    }),
  )

  if (sorted.length !== examples.length) {
    throw new Error('Missing example prefix')
  }

  return sorted
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

const metaYamlPath = path.join('playground', 'example.meta.yaml')
