// @ts-check

import { merge } from 'lodash-es'
import { pathExistsSync } from 'path-exists'
import { readPackageUpSync } from 'read-package-up'

/**
 * @param {import('tsup').Options | undefined} options
 * @returns {import('tsup').Options}
 */
export function config(options = undefined) {
  const pkg = readPackageUpSync()
  if (!pkg) {
    throw new Error('No package.json found')
  }

  /** @type {Record<string, string> | undefined} */
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const entryPoints = pkg.packageJson?.dev?.entry

  if (!entryPoints) {
    throw new Error(`Unable to find the field "dev.entry" in ${pkg.path}`)
  }

  /** @type {import('tsup').Options} */
  const defaultOptions = {
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

  return merge({}, defaultOptions, options)
}

/**
 * @param {Record<string, string>} entryPoints
 * @returns {Record<string, string>}
 */
function removeCssEntryPoints(entryPoints) {
  return Object.fromEntries(
    Object.entries(entryPoints).filter(([_, filePath]) => !filePath.endsWith('.css')),
  )
}

/**
 * @param {string} packageJsonPath
 * @returns {string}
 */
function getTsconfigPath(packageJsonPath) {
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
