import path from 'node:path'

import { normalizePackageJson } from './normalize-package-json.js'
import { vfs } from './virtual-file-system.js'

export async function genTypedocJson() {
  const packages = await vfs.getPublicPackages()

  for (const pkg of packages) {
    const entryPoints = await normalizePackageJson(pkg)
    const typedocJson = {
      $schema: 'https://typedoc.org/schema.json',
      extends: ['../../config/typedoc-base.json'],
      entryPoints: Object.values(entryPoints)
        .filter((entryPoint) => !entryPoint.endsWith('.css'))
        .sort(),
    }
    const typedocJsonPath = path.join(pkg.relativeDir, 'typedoc.json')
    const typedocJsonFile = await vfs.getFile(typedocJsonPath)
    typedocJsonFile.updateJSON(typedocJson)
  }
}
