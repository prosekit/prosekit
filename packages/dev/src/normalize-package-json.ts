import assert from 'node:assert'
import path from 'node:path'

import type { Package } from '@manypkg/get-packages'
import type { PackageJson } from 'type-fest'

import { getPackageJsonExports, getPackageJsonPublishExports } from './get-package-json-exports'
import { isPrivatePackage } from './is-public-package'
import { maybeUndefined } from './maybe-undefined'
import { findExistingFileInPackage, getExistingFileInPackage } from './package-files'
import { sortObject } from './sort-object'

export async function normalizePackageJson(pkg: Package): Promise<void> {
  if (isPrivatePackage(pkg) || pkg.packageJson.name === 'prosekit-registry') {
    return
  }

  const packageJson = pkg.packageJson as PackageJson

  const publishExports: Record<string, any> = {}
  const publishConfig: Record<string, any> = { exports: publishExports }
  packageJson.publishConfig = publishConfig

  const exports = getPackageJsonExports(pkg) || {}
  packageJson.exports = exports

  for (const exportName of Object.keys(exports)) {
    if (!isValidEntry(exportName)) {
      throw new Error(`exports["${exportName}"] is not allowed`)
    }

    if (exportName === '.') {
      const sourcePath = await getExistingFileInPackage(pkg, [
        `./src/index.ts`,
        `./src/index.tsx`,
        `./src/index.gen.ts`,
        `./src/index.gen.tsx`,
      ])

      packageJson.type = 'module'

      packageJson.main = sourcePath
      packageJson.module = sourcePath
      packageJson.types = undefined

      publishConfig.main = `./dist/index.js`
      publishConfig.module = `./dist/index.js`
      publishConfig.types = `./dist/index.d.ts`

      exports[exportName] = sourcePath
      publishExports[exportName] = {
        types: `./dist/index.d.ts`,
        default: `./dist/index.js`,
      }
    } else if (exportName.endsWith('.css')) {
      const distName = exportName.slice(2, -4)
      exports[exportName] = `./src/${distName}.css`
      publishExports[exportName] = {
        default: `./dist/${distName}.css`,
      }
    } else {
      const distName = exportName.slice(2)
      const sourcePath = await findExistingFileInPackage(pkg, [
        `./src/${distName}.ts`,
        `./src/${distName}.tsx`,
        `./src/${distName}.gen.ts`,
        `./src/${distName}.gen.tsx`,
        `./src/${distName}/index.ts`,
        `./src/${distName}/index.tsx`,
        `./src/${distName}/index.gen.ts`,
        `./src/${distName}/index.gen.tsx`,
        `./src/components/${distName}.ts`,
        `./src/components/${distName}.tsx`,
        `./src/components/${distName}.gen.ts`,
        `./src/components/${distName}.gen.tsx`,
        `./src/components/${distName}/index.ts`,
        `./src/components/${distName}/index.tsx`,
        `./src/components/${distName}/index.gen.ts`,
        `./src/components/${distName}/index.gen.tsx`,
      ])

      if (!sourcePath) {
        delete exports[exportName]
        delete publishExports[exportName]
        continue
      }

      // Svelte requires the export key "svelte" to be present in the
      // conditional export object.
      // See https://kit.svelte.dev/docs/packaging#anatomy-of-a-package-json-exports
      const isSvelte = pkg.packageJson.name.includes('svelte')
      exports[exportName] = isSvelte ? { svelte: sourcePath, default: sourcePath } : sourcePath
      publishExports[exportName] = {
        types: `./dist/${distName}.d.ts`,
        svelte: isSvelte ? `./dist/${distName}.js` : undefined,
        default: `./dist/${distName}.js`,
      }
    }
  }

  packageJson.exports = maybeUndefined(sortObject(getPackageJsonExports(pkg) ?? {}))
  packageJson.publishConfig.exports = maybeUndefined(sortObject(getPackageJsonPublishExports(pkg) ?? {}))

  normalizePackageJsonDocumentFields(pkg)
  normalizeTypesVersions(pkg)
}

function isValidEntry(entry: string): boolean {
  if (entry === '.') {
    return true
  }
  if (entry === './') {
    return false
  }
  return entry.startsWith('./')
}

function normalizePackageJsonDocumentFields(pkg: Package): void {
  Object.assign(pkg.packageJson, {
    license: 'MIT',
    funding: 'https://github.com/sponsors/ocavue',
    homepage: 'https://github.com/prosekit/prosekit#readme',
    repository: {
      type: 'git',
      url: 'git+https://github.com/prosekit/prosekit.git',
      directory: path.normalize(pkg.relativeDir),
    },
    bugs: {
      url: 'https://github.com/prosekit/prosekit/issues',
    },
  })
}

function normalizeTypesVersions(pkg: Package): void {
  const packageJson = pkg.packageJson as PackageJson
  assert(packageJson.publishConfig)
  packageJson.publishConfig['typesVersions'] = undefined
  const typesVersions: Record<string, string[]> = {}

  const exports = getPackageJsonPublishExports(pkg) as Record<string, Record<string, string>>
  assert(exports)

  for (const key of Object.keys(exports)) {
    const types = exports[key]?.['types']
    if (types) {
      typesVersions[key.replace(/^\.\//, '')] = [types]
    }
  }

  if (Object.keys(typesVersions).length > 0) {
    packageJson.publishConfig['typesVersions'] = { '*': typesVersions }
  }
}
