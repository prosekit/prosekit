import { vfs } from './virtual-file-system.js'

export async function genChangesetConfigJson() {
  const privatePackages = await vfs.getPrivatePackages()
  const publicPackages = await vfs.getPublicPackages()

  // Any package that is a dependency of a public package cannot be added to the
  // "ignore" list.
  const skipNames = new Set<string>()
  for (const pkg of publicPackages) {
    for (const deps of [pkg.packageJson.dependencies, pkg.packageJson.devDependencies]) {
      for (const dep of Object.keys(deps || {})) {
        skipNames.add(dep)
      }
    }
  }

  const ignoreNames: string[] = privatePackages
    .map((pkg) => pkg.packageJson.name)
    .filter((name) => !skipNames.has(name))
    .sort()

  const file = await vfs.getFile('.changeset/config.json')
  const json = await file.readJSON()
  json.ignore = ignoreNames
  file.updateJSON(json)
}
