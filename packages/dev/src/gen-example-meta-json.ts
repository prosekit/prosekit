import path from 'node:path'

import { Package } from '@manypkg/get-packages'
import { uniq } from 'lodash-es'

import { ExampleMeta, readExampleMeta, writeExampleMeta } from './example-meta'
import { skipGen } from './skip-gen'
import { vfs } from './virtual-file-system'

export async function genExampleMetaJson() {
  if (skipGen()) return

  const oldMeta: ExampleMeta = await readExampleMeta()
  const newMeta: ExampleMeta = {}

  for (const pkg of await vfs.getExamplePackages()) {
    const packageDir = path.basename(pkg.dir)

    const sharedFiles = await findSharedFiles(pkg)
    newMeta[packageDir] = {
      framework: oldMeta?.[packageDir]?.framework ?? packageDir,
      dependencies: pkg.packageJson.dependencies ?? {},
      devDependencies: pkg.packageJson.devDependencies ?? {},
      sharedFiles: Object.fromEntries(
        sharedFiles.map((file) => [
          file,
          {
            hidden: oldMeta?.[packageDir]?.sharedFiles?.[file]?.hidden ?? false,
          },
        ]),
      ),
      stories: {},
    }

    for (const story of await findStories(pkg)) {
      newMeta[packageDir].stories[story] = { files: {} }

      for (const file of await findStoryFiles(pkg, story)) {
        newMeta[packageDir].stories[story].files[file] = {
          hidden:
            oldMeta?.[packageDir]?.stories?.[story]?.files?.[file]?.hidden ??
            false,
        }
      }
    }
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
