import { vfs } from '@prosekit/dev'

import type { ItemAccumulator } from './types'

/**
 * Fill the package.json exports object with the appropriate entry for an example item.
 */
function fillExports(item: ItemAccumulator, exports: Record<string, unknown>): void {
  const { framework, story, category } = item
  if (category !== 'example') {
    return
  }
  if (!story) {
    throw new Error(`Expected story to be defined for example ${item.name}`)
  }
  exports[`./${framework}/examples/${story}`] = {
    default: `./src/${framework}/examples/${story}/index.ts`,
  }
}

/**
 * Update the package.json
 */
export async function updatePackageJSON(items: ItemAccumulator[]): Promise<void> {
  const pkg = await vfs.getPackageByName('prosekit-registry')
  const exports: Record<string, unknown> = {
    '.': './src/index.ts',
  }
  for (const item of items) {
    fillExports(item, exports)
  }
  // @ts-expect-error - exports is not in the type
  pkg.packageJson['exports'] = exports
  await vfs.updatePackage(pkg)
}
