import { getPackages } from '@manypkg/get-packages'

import { findRootDir } from './find-root-dir'
import { isPublicPackage } from './is-public-package'

export async function findPublicPackages() {
  const rootDir = await findRootDir()
  const { packages } = await getPackages(rootDir)
  return packages.filter(isPublicPackage)
}
