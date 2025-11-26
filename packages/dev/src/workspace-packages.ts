import { getPackages } from '@manypkg/get-packages'
import { once } from '@ocavue/utils'

import { debug } from './debug'
import {
  isPrivatePackage,
  isPublicPackage,
} from './is-public-package'
import { ROOT_DIR } from './root-dir'

/** Returns all workspace packages sorted by name. */
export const getWorkspacePackages = once(async () => {
  debug('getWorkspacePackages start')
  const { packages } = await getPackages(ROOT_DIR)
  const sortedPackages = packages.toSorted((a, b) => a.packageJson.name.localeCompare(b.packageJson.name))
  debug('getWorkspacePackages done packages=%d', sortedPackages.length)
  return sortedPackages
})

/** Finds a package by its name. */
export async function getPackageByName(name: string) {
  const packages = await getWorkspacePackages()
  const pkg = packages.find((pkg) => pkg.packageJson.name === name)
  if (!pkg) {
    throw new Error(`Failed to find package by name ${name}`)
  }
  return pkg
}

/** Returns all public packages. */
async function getPublicPackages() {
  const packages = await getWorkspacePackages()
  return packages.filter(isPublicPackage)
}

/** Returns all private packages. */
export async function getPrivatePackages() {
  const packages = await getWorkspacePackages()
  return packages.filter(isPrivatePackage)
}

/** Returns scoped public packages. */
export async function getScopedPublicPackages() {
  const packages = await getPublicPackages()
  return packages.filter((pkg) => pkg.packageJson.name.startsWith('@'))
}
