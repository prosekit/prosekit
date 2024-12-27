import { skipGen } from './skip-gen.js'
import { vfs } from './virtual-file-system.js'

export async function genTsconfigJson() {
  if (skipGen()) return

  const tsconfigFile = await vfs.getFile('tsconfig.json')
  const tsconfig = await tsconfigFile.readJSON()

  const tsconfigPaths = (await vfs.getFilePathsByDir('.'))
    .filter((p) => p.match(/(\.-\w)*tsconfig(\.-\w)*\.json$/) && p !== 'tsconfig.json')
    .sort()

  tsconfig.references = tsconfigPaths.map((path) => ({ path }))
  tsconfigFile.updateJSON(tsconfig)
}
