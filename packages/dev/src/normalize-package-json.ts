import assert from 'node:assert'
import path from 'node:path'

import type { Package } from '@manypkg/get-packages'
import slugify from '@sindresorhus/slugify'
import type { PackageJson } from 'type-fest'

import {
  getPackageJsonExports,
  getPackageJsonPublishExports,
} from './get-package-json-exports.js'
import { isPrivatePackage } from './is-public-package.js'
import { maybeUndefined } from './maybe-undefined.js'
import { sortObject } from './sort-object.js'
import { vfs } from './virtual-file-system.js'

export async function normalizePackageJson(pkg: Package) {
  if (isPrivatePackage(pkg)) {
    return {}
  }

  const packageJson = pkg.packageJson as PackageJson
  const slugPackageName = slugify(pkg.packageJson.name)

  const publishExports: Record<string, any> = {}
  const publishConfig: Record<string, any> = { exports: publishExports, dev: {} }
  packageJson.publishConfig = publishConfig

  const exports = getPackageJsonExports(pkg) || {}
  packageJson.exports = exports

  const entryPoints: Record<string, string> = {}
  packageJson.dev = { entry: entryPoints }

  for (const path of Object.keys(exports)) {
    let sourcePath: string
    let distName: string

    if (!isValidEntry(path)) {
      throw new Error(`exports["${path}"] is not allowed`)
    }

    if (path === '.') {
      sourcePath = await vfs.getExistingFileInPackage(pkg, [
        `./src/index.ts`,
        `./src/index.tsx`,
        `./src/index.gen.ts`,
        `./src/index.gen.tsx`,
      ])
      distName = slugPackageName

      packageJson.type = 'module'

      packageJson.main = sourcePath
      packageJson.module = sourcePath
      packageJson.types = undefined

      publishConfig.main = `./dist/${distName}.js`
      publishConfig.module = `./dist/${distName}.js`
      publishConfig.types = `./dist/${distName}.d.ts`

      exports[path] = sourcePath
      publishExports[path] = {
        types: `./dist/${distName}.d.ts`,
        default: `./dist/${distName}.js`,
      }
    } else if (path.endsWith('.css')) {
      distName = path.slice(2, -4)
      sourcePath = './src/' + distName + '.css'

      exports[path] = sourcePath
      publishExports[path] = {
        default: `./dist/${distName}.css`,
      }
    } else {
      const subPath = path.slice(2)
      const foundFilePath = await vfs.findExistingFileInPackage(pkg, [
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
        delete exports[path]
        delete publishExports[path]
        continue
      }

      sourcePath = foundFilePath
      distName = slugify(`${slugPackageName}-${subPath}`)

      // Svelte requires the export key "svelte" to be present in the
      // conditional export object.
      // See https://kit.svelte.dev/docs/packaging#anatomy-of-a-package-json-exports
      const isSvelte = pkg.packageJson.name.includes('svelte')

      exports[path] = isSvelte
        ? { svelte: sourcePath, default: sourcePath }
        : sourcePath

      publishExports[path] = {
        types: `./dist/${distName}.d.ts`,
        svelte: isSvelte ? `./dist/${distName}.js` : undefined,
        default: `./dist/${distName}.js`,
      }
    }
    entryPoints[distName] = sourcePath
  }

  packageJson.exports = maybeUndefined(sortObject(getPackageJsonExports(pkg) ?? {}))
  packageJson.publishConfig.exports = maybeUndefined(sortObject(getPackageJsonPublishExports(pkg) ?? {}))

  normalizePackageJsonDocumentFields(pkg)
  normalizeTypesVersions(pkg)

  return entryPoints
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

function normalizePackageJsonDocumentFields(pkg: Package) {
  Object.assign(pkg.packageJson, {
    license: 'MIT',
    funding: 'https://github.com/sponsors/ocavue',
    homepage: 'https://github.com/ocavue/prosekit#readme',
    repository: {
      type: 'git',
      url: 'git+https://github.com/ocavue/prosekit.git',
      directory: path.normalize(pkg.relativeDir),
    },
    bugs: {
      url: 'https://github.com/ocavue/prosekit/issues',
    },
  })
}

function normalizeTypesVersions(pkg: Package) {
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
