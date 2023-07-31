import path from 'node:path'

import type { Package } from '@manypkg/get-packages'

import { vfs } from './virtual-file-system'

export async function genSizeLimitJson() {
  const pkg = await vfs.getPackageByName('prosekit')
  const sizeLimitConfig = Array.from(iterateExports(pkg))
  await vfs.updateJSON('.size-limit.json', sizeLimitConfig)
}

function* iterateExports(pkg: Package) {
  const exports: Record<string, string | Record<string, string>> =
    (pkg.packageJson as any)?.publishConfig?.exports ?? {}

  for (const [entryName, entry] of Object.entries(exports)) {
    // size-limit cannot handle .svelte files
    if (entryName.includes('svelte') && entryName.includes('component')) {
      continue
    }

    const entryPath = typeof entry === 'string' ? entry : entry.default

    yield {
      name: path.normalize(path.join('prosekit', entryName)),
      path: path.normalize(path.join('packages/prosekit', entryPath)),
    }
  }
}
