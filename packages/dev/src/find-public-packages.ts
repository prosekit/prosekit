import { getPackages } from '@manypkg/get-packages'

import { findRootDir } from './find-root-dir.js'
import { isPublicPackage } from './is-public-package.js'

export async function findPublicPackages() {
  const rootDir = await findRootDir()
  const { packages } = await getPackages(rootDir)
  return packages.filter(isPublicPackage)
}
