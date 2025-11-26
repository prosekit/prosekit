import path from 'node:path'

import type { PackageJson } from 'type-fest'

import { getPackageJsonExports } from './get-package-json-exports'
import { cleanGeneratedFilesInPackage } from './package-files'
import { vfs } from './vfs'
import {
  getPackageByName,
  getScopedPublicPackages,
} from './workspace-packages'

export async function buildUmbrellaPackageJson(): Promise<void> {
  const umbrellaPackage = await getPackageByName('prosekit')
  await cleanGeneratedFilesInPackage(umbrellaPackage)

  const pkgExports: Record<string, string> = { '.': './src/index.ts' }
  const pkgDependencies: Record<string, string> = {}
  const pkgPeerDependencies: Record<string, string> = {}
  const pkgPeerDependenciesMeta: Record<string, string> = {}

  // @ts-expect-error: exports is not in the type
  umbrellaPackage.packageJson.exports = pkgExports
  umbrellaPackage.packageJson.dependencies = pkgDependencies
  umbrellaPackage.packageJson.peerDependencies = pkgPeerDependencies
  // @ts-expect-error: peerDependenciesMeta is not in the type
  umbrellaPackage.packageJson.peerDependenciesMeta = pkgPeerDependenciesMeta

  const scopedPackages = await getScopedPublicPackages()

  for (const pkg of scopedPackages) {
    const packageJson = pkg.packageJson as PackageJson
    const packageName = pkg.packageJson.name

    const entries = Object.keys(getPackageJsonExports(pkg) ?? {})

    pkgDependencies[packageName] = 'workspace:*'

    Object.assign(pkgPeerDependencies, packageJson.peerDependencies)
    Object.assign(pkgPeerDependenciesMeta, packageJson.peerDependenciesMeta)

    for (const entry of entries) {
      await ensureEntry({
        cwd: umbrellaPackage.relativeDir,
        entry,
        packageName,
        exports: pkgExports,
      })
    }
  }
}

async function ensureEntry({
  cwd,
  packageName,
  entry,
  exports,
}: {
  cwd: string
  // Example: @prosekit/extension-foo
  packageName: string
  // Example:
  //    .
  //    ./sub-path
  //    ./sub-path/style.css
  entry: string
  // Where the result will be written to
  exports: Record<string, string>
}): Promise<void> {
  // Example: extension-foo
  const packageSubName = packageName.split('/')[1]

  const reExportEntry = './' + path.normalize(path.join(packageSubName, entry))
  let reExportFilePath = './'
    + path.normalize(
      path.join(
        'src',
        ensureFileExtension(
          entry === '.' ? packageSubName : path.join(packageSubName, entry),
        ),
      ),
    )

  // If `packages/prosekit/src/pm/view.ts` already exists, we don't want to
  // generate `packages/prosekit/src/pm/view.gen.ts`
  if (await vfs.pathExists(path.join(cwd, reExportFilePath))) {
    exports[reExportEntry] = reExportFilePath
    return
  }

  reExportFilePath = reExportFilePath.replace(/(.tsx?$)/, '.gen$1')

  exports[reExportEntry] = reExportFilePath

  const importName = path.normalize(packageName + '/' + entry)
  const targetPath = path.join(cwd, reExportFilePath)
  if (reExportFilePath.endsWith('.css')) {
    vfs.updateText(targetPath, formatCssReExportFile(importName))
  } else {
    vfs.updateText(targetPath, formatTsReExportFile(importName))
  }
}

function ensureFileExtension(filePath: string, defaultExtension = '.ts'): string {
  return filePath + (path.extname(filePath) ? '' : defaultExtension)
}

function formatTsReExportFile(importName: string): string {
  const importNameWithoutPrefix = importName.startsWith('@')
    ? importName.slice(1)
    : importName

  return (
    `
/**
 * @module ${importNameWithoutPrefix}
 */

export * from '${importName}'
  `.trim() + '\n'
  )
}

function formatCssReExportFile(importName: string): string {
  return `@import '${importName}';\n`
}
