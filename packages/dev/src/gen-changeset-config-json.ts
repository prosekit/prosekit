import { DefaultMap } from '@ocavue/utils'

import { isPublicPackage } from './is-public-package'
import { vfs } from './vfs'
import {
  getPrivatePackages,
  getWorkspacePackages,
} from './workspace-packages'

export async function genChangesetConfigJson(): Promise<void> {
  const privatePackages = await getPrivatePackages()
  const visiblePackages = await getVisiblePackages()

  const ignoreNames: string[] = privatePackages
    .map((pkg) => pkg.packageJson.name)
    .filter((name) => !visiblePackages.has(name))
    .sort()

  const json = await vfs.readJSON<{ ignore?: string[] }>('.changeset/config.json')
  json.ignore = ignoreNames
  vfs.updateJSON('.changeset/config.json', json)
}

/**
 * Returns all public packages and their dependencies, dependencies of
 * dependencies, etc.
 */
async function getVisiblePackages(): Promise<Set<string>> {
  const packages = await getWorkspacePackages()
  const packageToDependencies = new DefaultMap<string, string[]>(() => [])
  for (const pkg of packages) {
    const dependencies = Object.keys(pkg.packageJson.dependencies || {})
    const devDependencies = Object.keys(pkg.packageJson.devDependencies || {})
    packageToDependencies.set(pkg.packageJson.name, [...dependencies, ...devDependencies])
  }

  const seen = new Set<string>()
  const queue: string[] = packages.filter(isPublicPackage).map((pkg) => pkg.packageJson.name)

  while (true) {
    const name = queue.pop()
    if (!name) {
      break
    }
    const dependencies = packageToDependencies.get(name)
    for (const dependency of dependencies) {
      if (!seen.has(dependency)) {
        seen.add(dependency)
        queue.push(dependency)
      }
    }
  }

  return seen
}
