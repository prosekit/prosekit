import path from 'node:path'

import { findPublicPackages } from './find-public-packages.js'
import { findRootDir } from './find-root-dir.js'
import { hideInTypedoc } from './hide-in-typedoc.js'
import { normalizePackageJson } from './normalize-package-json.js'
import { readJson } from './read-json.js'
import { writeJson } from './write-json.js'

// TODO: use vfs
export async function genTypedocJson() {
  const packages = await findPublicPackages()

  const rootDir = await findRootDir()
  const websiteDir = path.join(rootDir, 'website')
  const websiteTypedocPath = path.join(websiteDir, 'typedoc.json')
  const websiteTypedocJson = await readJson(websiteTypedocPath)
  websiteTypedocJson.entryPoints = packages
    .filter((pkg) => !hideInTypedoc(pkg.packageJson.name))
    .map((pkg) => path.relative(websiteDir, pkg.dir))
    .sort()
  await writeJson(websiteTypedocPath, websiteTypedocJson)

  for (const pkg of packages) {
    const entryPoints = await normalizePackageJson(pkg)
    const typeDocJson = {
      $schema: 'https://typedoc.org/schema.json',
      extends: ['../../config/typedoc-base.json'],
      entryPoints: Object.values(entryPoints)
        .filter((entryPoint) => !entryPoint.endsWith('.css'))
        .sort(),
    }
    await writeJson(path.join(pkg.dir, 'typedoc.json'), typeDocJson)
  }
}
