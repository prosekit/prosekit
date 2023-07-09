import { sortBy, uniq } from 'lodash-es'

import { skipGen } from './skip-gen.js'
import { vfs } from './virtual-file-system.js'

export async function genRenovateJson() {
  if (skipGen()) return

  const renovateJsonFile = await vfs.getFile('renovate.json')
  const renovateJson = await renovateJsonFile.readJSON()

  const packages = await vfs.getPackages()
  const packageNames = packages.map((pkg) => pkg.packageJson.name)

  renovateJsonFile.updateJSON({
    ...renovateJson,
    ignoreDeps: sortBy(uniq([...renovateJson.ignoreDeps, ...packageNames])),
  })
}
