import { isPublicPackage } from './is-public-package.js'
import { vfs } from './virtual-file-system.js'

export async function genChangesetConfigJson() {
  const privatePackages = await vfs.getPrivatePackages()
  const visiblePackages = await getVisiblePackages()

  const ignoreNames: string[] = privatePackages
    .map((pkg) => pkg.packageJson.name)
    .filter((name) => !visiblePackages.has(name))
    .sort()

  const file = await vfs.getFile('.changeset/config.json')
  const json = await file.readJSON()
  json.ignore = ignoreNames
  file.updateJSON(json)
}

/**
 * Returns all public packages and their dependencies, dependencies of
 * dependencies, etc.
 */
async function getVisiblePackages(): Promise<Set<string>> {
  const packages = await vfs.getPackages()
  const packageToDependencies = new Map<string, string[]>()
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
    const dependencies = packageToDependencies.get(name) || []
    for (const dependency of dependencies) {
      if (!seen.has(dependency)) {
        seen.add(dependency)
        queue.push(dependency)
      }
    }
  }

  return seen
}
