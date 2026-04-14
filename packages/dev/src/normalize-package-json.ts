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
    let sourcePath: string
    let distName: string
    let isSvelte: boolean = false

    if (!isValidEntry(exportName)) {
      throw new Error(`exports["${exportName}"] is not allowed`)
    }

    if (exportName === '.') {
      sourcePath = await getExistingFileInPackage(pkg, [
        `./src/index.ts`,
        `./src/index.tsx`,
        `./src/index.gen.ts`,
        `./src/index.gen.tsx`,
      ])
      distName = 'index'

      packageJson.type = 'module'
      packageJson.main = sourcePath
      packageJson.module = sourcePath
      packageJson.types = undefined

      publishConfig.main = `./dist/${distName}.js`
      publishConfig.module = `./dist/${distName}.js`
      publishConfig.types = `./dist/${distName}.d.ts`

      exports[exportName] = sourcePath
      publishExports[exportName] = {
        types: `./dist/${distName}.d.ts`,
        default: `./dist/${distName}.js`,
      }
    } else if (exportName.endsWith('.css')) {
      distName = exportName.slice(2, -4)
      sourcePath = './src/' + distName + '.css'

      exports[exportName] = sourcePath
      publishExports[exportName] = {
        default: `./dist/${distName}.css`,
      }
    } else {
      const subPath = exportName.slice(2)
      const foundFilePath = await findExistingFileInPackage(pkg, [
        `./src/${subPath}.ts`,
        `./src/${subPath}.tsx`,
        `./src/${subPath}.gen.ts`,
        `./src/${subPath}.gen.tsx`,
        `./src/${subPath}/index.ts`,
        `./src/${subPath}/index.tsx`,
        `./src/${subPath}/index.gen.ts`,
        `./src/${subPath}/index.gen.tsx`,
        `./src/components/${subPath}.ts`,
        `./src/components/${subPath}.tsx`,
        `./src/components/${subPath}.gen.ts`,
        `./src/components/${subPath}.gen.tsx`,
        `./src/components/${subPath}/index.ts`,
        `./src/components/${subPath}/index.tsx`,
        `./src/components/${subPath}/index.gen.ts`,
        `./src/components/${subPath}/index.gen.tsx`,
      ])

      if (!foundFilePath) {
        delete exports[exportName]
        delete publishExports[exportName]
        continue
      }

      sourcePath = foundFilePath
      distName = subPath

      // Svelte requires the export key "svelte" to be present in the
      // conditional export object.
      // See https://kit.svelte.dev/docs/packaging#anatomy-of-a-package-json-exports
      isSvelte = pkg.packageJson.name.includes('svelte')
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
