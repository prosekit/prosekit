import assert from 'node:assert'
import path from 'node:path'

import type { Package } from '@manypkg/get-packages'

import { asyncFrom } from './async-from'
import { getPackageJsonPublishExports } from './get-package-json-exports'
import { vfs } from './vfs'
import { getPackageByName } from './workspace-packages'
import { debug } from './debug'

export async function genSizeLimitJson() {
  debug('genSizeLimitJson start')
  const pkg = await getPackageByName('prosekit')
  const sizeLimitConfig = await asyncFrom(iterateExports(pkg))
  vfs.updateJSON('.size-limit.json', sizeLimitConfig)
  debug('genSizeLimitJson done')
}

async function* iterateExports(pkg: Package) {
  const exports = getPackageJsonPublishExports(pkg) ?? {}

  for (const [entryName, entry] of Object.entries(exports)) {
    // size-limit cannot handle .svelte files
    if (entryName.includes('svelte')) {
      continue
    }

    // The root package is empty
    if (entryName === '.') {
      continue
    }

    const subPackageName = path
      .join('@prosekit', entryName)
      .split('/')
      .slice(0, 2)
      .join('/')

    const subPackage = await getPackageByName(subPackageName)
    const ignored = new Set<string>(
      // Ignore peer dependencies
      Object.keys(subPackage.packageJson.peerDependencies ?? {}),
    )

    const entryPath = typeof entry === 'string' ? entry : entry.default
    assert(entryPath, `Unexpected entry: ${JSON.stringify(entry)}. entryName: ${entryName}. package name: ${pkg.packageJson.name}.`)

    yield {
      name: path.normalize(path.join('prosekit', entryName)),
      path: path.normalize(path.join('packages/prosekit', entryPath)),
      ignore: ignored.size > 0 ? Array.from(ignored) : undefined,
    }
  }
}
