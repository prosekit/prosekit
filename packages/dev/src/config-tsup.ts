import path from 'node:path'

import filterObject from 'just-filter-object'
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

  const defaultOptions: Options = {
    format: ['esm'],
    entry: entryPoints,
    splitting: true,
    sourcemap: false,
    clean: false,
    noExternal: [/\.css$/i],
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
  return deepMerge(a, b) as Options
}

function deepMerge(a: any, b: any): any {
  if (a === b) {
    return a
  }
  if (a === undefined) {
    return b
  }
  if (b === undefined) {
    return a
  }
  if ((a && b && Array.isArray(a)) || Array.isArray(b)) {
    return [...a, ...b]
  }
  if (a && b && typeof a === 'object' && typeof b === 'object') {
    const result: any = {}
    const keys = new Set([...Object.keys(a), ...Object.keys(b)])
    for (const key of keys) {
      result[key] = deepMerge(a[key], b[key])
    }
    return result
  }
  throw new Error(`Cannot merge ${a} and ${b}`)
}
