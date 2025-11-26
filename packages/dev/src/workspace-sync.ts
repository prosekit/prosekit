import path from 'node:path'

import { normalizePackageJson } from './normalize-package-json'
import { vfs } from './vfs'
import { getWorkspacePackages } from './workspace-packages'

/** Normalizes every workspace package.json and stages the result via the VFS. */
export async function syncWorkspacePackages(): Promise<void> {
  const packages = await getWorkspacePackages()
  for (const pkg of packages) {
    await normalizePackageJson(pkg)
    vfs.updateJSON(path.join(pkg.relativeDir, 'package.json'), pkg.packageJson)
  }
}
