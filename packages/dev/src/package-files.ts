import type { Package } from '@manypkg/get-packages'

import { vfs } from './vfs'

/** Removes generated files inside a package directory. */
export async function cleanGeneratedFilesInPackage(pkg: Package): Promise<void> {
  await vfs.cleanFilesInDir(pkg.relativeDir, true)
}
