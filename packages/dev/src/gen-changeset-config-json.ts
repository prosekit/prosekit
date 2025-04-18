import { vfs } from './virtual-file-system.js'

export async function genChangesetConfigJson() {
  const privatePackages = await vfs.getPrivatePackages()
  const publicPackages = await vfs.getPublicPackages()

  const publicPackageDependencyNames = new Set<string>()
  for (const pkg of publicPackages) {
    for (const deps of [pkg.packageJson.dependencies, pkg.packageJson.devDependencies]) {
      for (const dep of Object.keys(deps || {})) {
        publicPackageDependencyNames.add(dep)
      }
    }
  }

  const ignoredPackageNames = privatePackages
    .map((pkg) => pkg.packageJson.name)
    .filter((name) => !publicPackageDependencyNames.has(name))
    .sort()

  const file = await vfs.getFile('.changeset/config.json')
  const json = await file.readJSON()
  json.ignore = ignoredPackageNames
  file.updateJSON(json)
}
