import path from 'node:path'

import { type Package } from '@manypkg/get-packages'
import { uniq } from 'lodash-es'

import {
  findExampleCollection,
  findExampleCollectionFile,
  findExampleStoryFile,
  readExampleMeta,
  writeExampleMeta,
  type ExampleCollection,
  type ExampleMeta,
} from './example-meta'
import { skipGen } from './skip-gen'
import { vfs } from './virtual-file-system'

export async function genExampleMetaYaml() {
  if (skipGen()) return

  const oldMeta: ExampleMeta = await readExampleMeta()
  const newMeta: ExampleMeta = { collections: [] }

  for (const pkg of await vfs.getExamplePackages()) {
    const sharedFiles = await findSharedFiles(pkg)

    const collectionName = path.basename(pkg.dir)
    const oldCollection = findExampleCollection(oldMeta, collectionName)
    const newCollection: ExampleCollection = {
      name: collectionName,
      order: oldCollection?.order ?? 9999,
      frameworks: oldCollection?.frameworks ?? [collectionName],
      files: sharedFiles.map((filePath) => ({
        path: filePath,
        hidden:
          findExampleCollectionFile(oldMeta, collectionName, filePath)
            ?.hidden ?? false,
      })),
      stories: [],
    }

    for (const storyName of await findStories(pkg)) {
      const storyFiles = await findStoryFiles(pkg, storyName)

      newCollection.stories.push({
        name: storyName,
        files: storyFiles.map((filePath) => ({
          path: filePath,
          hidden:
            findExampleStoryFile(oldMeta, collectionName, storyName, filePath)
              ?.hidden ?? false,
        })),
      })
    }

    newMeta.collections.push(newCollection)
  }

  await writeExampleMeta(newMeta)
}

async function findStories(pkg: Package): Promise<string[]> {
  const files = await vfs.getFilePathsByPackage(pkg)
  const appFiles = files.filter((file) => path.basename(file).match(/^app\./i))
  const appDirs = appFiles
    .map((appFile) => path.dirname(appFile))
    .filter((appDir) => appDir !== pkg.relativeDir)
  const appNames = appDirs.map((appDir) => path.basename(appDir)).sort()
  return uniq(appNames)
}

async function findSharedFiles(pkg: Package): Promise<string[]> {
  const files = await vfs.getFilePathsByPackage(pkg)
  return files
    .filter((file) => path.dirname(file) === pkg.relativeDir)
    .map((file) => path.relative(pkg.relativeDir, file))
}

async function findStoryFiles(pkg: Package, story: string): Promise<string[]> {
  const storySourceDir = path.join(pkg.relativeDir, 'src', story)
  const storeFiles = await vfs.getFilePathsByDir(storySourceDir)
  return storeFiles.map((file) => path.relative(storySourceDir, file))
}
