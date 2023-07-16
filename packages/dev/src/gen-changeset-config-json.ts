import { vfs } from './virtual-file-system'

export async function genChangesetConfigJson() {
  const packages = await vfs.getPrivatePackages()
  const packageNames = packages
    .map((pkg) => pkg.packageJson.name)
    .filter((name) => !skip.includes(name))
    .sort()

  const file = await vfs.getFile('.changeset/config.json')
  const json = await file.readJSON()
  json.ignore = packageNames
  file.updateJSON(json)
}

const skip = [
  // Public packages depend on @prosekit/dev so we cannot ignore it
  '@prosekit/dev',
]
