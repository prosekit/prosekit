import path from 'node:path'

import { normalizePackageJson } from './normalize-package-json.js'
import { vfs } from './virtual-file-system.js'

export async function genTypedocJson() {
  const pkg = await vfs.getPackageByName('prosekit')
  const entryPoints = await normalizePackageJson(pkg)
  const typedocJson = {
    $schema: 'https://typedoc.org/schema.json',
    entryPoints: Object.values(entryPoints)
      .filter((entryPoint) => !entryPoint.endsWith('.css'))
      // Remove lit modules because they are just simple re-exports from the web modules
      .filter((entryPoint) => !/^[^a-z]*src\/lit/.test(entryPoint))
      .sort(),
  }
  const typedocJsonPath = path.join(pkg.relativeDir, 'typedoc.gen.json')
  const typedocJsonFile = await vfs.ensureFile(typedocJsonPath)
  typedocJsonFile.updateJSON(typedocJson)
}
