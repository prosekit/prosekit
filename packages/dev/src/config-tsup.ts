import path from 'node:path'

import filterObject from 'just-filter-object'
import { merge } from 'lodash-es'
import { pathExists } from 'path-exists'
import { readPackage } from 'read-pkg'
import type { Options } from 'tsup'

import { findRootDir } from './find-root-dir.js'
import { normalizePackageJson } from './normalize-package-json.js'

export function config(options?: Options): () => Promise<Options> {
  return () => getConfig(options)
}

async function getConfig(options?: Options): Promise<Options> {
  const rootDir = await findRootDir()
  const packageDir = process.cwd()
  const packageJson = await readPackage({ cwd: packageDir })
  const entryPoints = await normalizePackageJson({
    packageJson: packageJson as any,
    dir: packageDir,
    relativeDir: path.relative(rootDir, packageDir),
  })

  const tsconfigBuildPath = path.resolve(packageDir, 'tsconfig.build.json')
  const tsconfigPath = path.resolve(packageDir, 'tsconfig.json')

  const defaultOptions: Options = {
    format: ['esm'],
    entry: entryPoints,
    splitting: true,
    sourcemap: false,
    clean: false,
    noExternal: [/\.css$/i],
    tsconfig: (await pathExists(tsconfigBuildPath)) ? tsconfigBuildPath : tsconfigPath,
    experimentalDts: {
      entry: removeCssEntryPoints(entryPoints),
    },
  }

  const merged: Options = deepMergeOptions(defaultOptions, options)
  return merged
}

function removeCssEntryPoints(
  entryPoints: Record<string, string>,
): Record<string, string> {
  return filterObject(
    entryPoints,
    (key, filePath) => !filePath.endsWith('.css'),
  ) as Record<string, string>
}

function deepMergeOptions(a: Options, b?: Options): Options {
  return merge({}, a, b)
}
