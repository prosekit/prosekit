import path from 'node:path'

import { findPublicPackages } from './find-public-packages.js'
import { findRootDir } from './find-root-dir.js'
import { readJson } from './read-json.js'
import { skipGen } from './skip-gen.js'
import { writeJson } from './write-json.js'

// TODO: use vfs
export async function genTsconfigJson() {
  if (skipGen()) return

  const packages = await findPublicPackages()
  const rootDir = await findRootDir()
  const tsconfigPath = path.join(rootDir, 'tsconfig.json')
  const tsconfig = await readJson(tsconfigPath)

  tsconfig.references = packages.map((pkg) => ({ path: pkg.relativeDir }))

  await writeJson(tsconfigPath, tsconfig)
}
