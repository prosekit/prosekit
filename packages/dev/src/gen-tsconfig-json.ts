import { skipGen } from './skip-gen.js'
import { vfs } from './virtual-file-system.js'

export async function genTsconfigJson() {
  if (skipGen()) return

  const packages = await vfs.getPublicPackages()
  const tsconfigFile = await vfs.getFile('tsconfig.json')
  const tsconfig = await tsconfigFile.readJSON()
  tsconfig.references = packages.map((pkg) => ({ path: pkg.relativeDir }))
  tsconfigFile.updateJSON(tsconfig)
}
