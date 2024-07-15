import path from 'node:path'

import { readPackage } from 'read-pkg'
import { type Options } from 'tsup'

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

  const merged: Options = { ...defaultOptions, ...options }
  return merged
}

function removeCssEntryPoints(entryPoints: Record<string, string>) {
  return Object.fromEntries(
    Object.entries(entryPoints).filter(
      ([_, filePath]) => !filePath.endsWith('.css'),
    ),
  )
}
