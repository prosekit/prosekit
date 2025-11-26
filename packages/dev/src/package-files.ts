import path from 'node:path'

import type { Package } from '@manypkg/get-packages'

import { vfs } from './vfs'

/** Returns file paths inside a package directory. */
export async function getFilePathsByPackage(pkg: Package) {
  return await vfs.getFilePathsByDir(pkg.relativeDir)
}

/** Removes generated files inside a package directory. */
export async function cleanGeneratedFilesInPackage(pkg: Package) {
  await vfs.cleanFilesInDir(pkg.relativeDir, true)
}

/** Updates a file inside a package. */
export async function updateTextInPackage(
  pkg: Package,
  filePath: string,
  content: string,
) {
  await vfs.updateText(path.join(pkg.relativeDir, filePath), content)
}

/** Returns the first existing file inside a package from a list of candidates. */
export async function findExistingFileInPackage(
  pkg: Package,
  relativeFilePaths: string[],
) {
  for (const relativeFilePath of relativeFilePaths) {
    const filePath = path.join(pkg.relativeDir, relativeFilePath)
    if (await vfs.pathExists(filePath)) {
      return relativeFilePath
    }
  }
  return null
}

/** Returns an existing file or throws if none of the candidates exist. */
export async function getExistingFileInPackage(
  pkg: Package,
  relativeFilePaths: string[],
) {
  const relativeFilePath = await findExistingFileInPackage(pkg, relativeFilePaths)
  if (!relativeFilePath) {
    throw new Error(
      `Failed to find file ${relativeFilePaths} in directory ${pkg.dir}`,
    )
  }
  return relativeFilePath
}
