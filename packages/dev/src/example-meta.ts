import path from 'node:path'

import { vfs } from './virtual-file-system.js'

export interface ExampleMeta {
  collections: ExampleCollection[]
}

interface ExampleFile {
  path: string
  hidden: boolean
}

interface ExampleStory {
  name: string
  files: ExampleFile[]
}

export interface ExampleCollection {
  name: string
  order: number
  frameworks: string[]
  files: ExampleFile[]
  stories: ExampleStory[]
}

export async function readExampleMeta(): Promise<ExampleMeta> {
  const file = await vfs.getFile(metaJsonPath)
  return (await file.readYaml()) as ExampleMeta
}

export async function writeExampleMeta(meta: ExampleMeta) {
  meta.collections.sort((a, b) => a.order - b.order)
  const file = await vfs.getFile(metaJsonPath)
  file.updateYaml(meta)
}

export function findExampleCollection(
  meta: ExampleMeta,
  collectionName: string,
) {
  return meta.collections.find((c) => c.name === collectionName)
}

export function findExampleCollectionFile(
  meta: ExampleMeta,
  collectionName: string,
  filePath: string,
) {
  const collection = findExampleCollection(meta, collectionName)
  return collection?.files.find((f) => f.path === filePath)
}

export function findExampleStory(
  meta: ExampleMeta,
  collectionName: string,
  storyName: string,
) {
  const collection = findExampleCollection(meta, collectionName)
  return collection?.stories.find((s) => s.name === storyName)
}

export function findExampleStoryFile(
  meta: ExampleMeta,
  collectionName: string,
  storyName: string,
  filePath: string,
) {
  const story = findExampleStory(meta, collectionName, storyName)
  return story?.files.find((f) => f.path === filePath)
}

const metaJsonPath = path.join('examples', 'example.meta.yaml')
