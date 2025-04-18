import { merge } from 'lodash-es'
import { pathExistsSync } from 'path-exists'
import { readPackageUpSync } from 'read-package-up'
import type { Options } from 'tsup'

export function config(options?: Options): Options {
  const pkg = readPackageUpSync()
  if (!pkg) {
    throw new Error('No package.json found')
  }

  const packageJson = pkg.packageJson as {
    dev?: {
      entry: Record<string, string>
    }
  }

  const entryPoints = packageJson?.dev?.entry

  if (!entryPoints) {
    throw new Error(`Unable to find the field "dev.entry" in ${pkg.path}`)
  }

  const defaultOptions: Options = {
    format: ['esm'],
    entry: entryPoints,
    splitting: true,
    sourcemap: false,
    clean: false,
    noExternal: [/\.css$/i],
    tsconfig: getTsconfigPath(pkg.path),
    experimentalDts: {
      entry: removeCssEntryPoints(entryPoints),
    },
  }

  return deepMergeOptions(defaultOptions, options)
}

function removeCssEntryPoints(
  entryPoints: Record<string, string>,
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(entryPoints).filter(([_, filePath]) => !filePath.endsWith('.css')),
  )
}

function deepMergeOptions(a: Options, b?: Options): Options {
  return merge({}, a, b)
}

function getTsconfigPath(packageJsonPath: string): string {
  if (!packageJsonPath.endsWith('package.json')) {
    throw new Error('Unexpected package.json path')
  }

  const tsconfigBuildPath = packageJsonPath.replace(/package.json$/, 'tsconfig.build.json')
  const tsconfigPath = packageJsonPath.replace(/package.json$/, 'tsconfig.json')

  if (pathExistsSync(tsconfigBuildPath)) {
    return tsconfigBuildPath
  }

  if (pathExistsSync(tsconfigPath)) {
    return tsconfigPath
  }

  throw new Error(`Unable to find ${tsconfigBuildPath} or ${tsconfigPath}`)
}
