import path from 'node:path'

import { vfs } from './virtual-file-system'

export async function buildUmbrellaPackageJson() {
  const umbrellaPackage = await vfs.getPackageByName('prosekit')
  await vfs.cleanGeneratedFilesInPackage(umbrellaPackage)

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

  const scopedPackages = await vfs.getScopedPublicPackages()

  for (const pkg of scopedPackages) {
    const fullPackageName = pkg.packageJson.name
    const entries = Object.keys((pkg.packageJson as any).exports ?? {})

    pkgDependencies[fullPackageName] = pkg.packageJson.version

    Object.assign(pkgPeerDependencies, pkg.packageJson.peerDependencies)
    // @ts-expect-error: peerDependenciesMeta is not in the type
    Object.assign(pkgPeerDependenciesMeta, pkg.packageJson.peerDependenciesMeta)

    for (const entry of entries) {
      await ensureEntry({
        cwd: umbrellaPackage.relativeDir,
        entry,
        packageName: pkg.packageJson.name,
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
}) {
  // Example: extension-foo
  const packageSubName = packageName.split('/')[1]

  const reExportEntry = './' + path.normalize(path.join(packageSubName, entry))
  let reExportFilePath =
    './' +
    path.normalize(
      path.join(
        'src',
        ensureFileExtension(
          entry === '.' ? packageSubName : path.join(packageSubName, entry),
        ),
      ),
    )

  reExportFilePath = reExportFilePath.replace(/(.tsx?$)/, '.gen$1')

  exports[reExportEntry] = reExportFilePath

  const importName = path.normalize(packageName + '/' + entry)
  if (reExportFilePath.endsWith('.css')) {
    await vfs.updateText(
      path.join(cwd, reExportFilePath),
      formatCssReExportFile(importName),
    )
  } else {
    await vfs.updateText(
      path.join(cwd, reExportFilePath),
      formatTsReExportFile(importName),
    )
  }
}

function ensureFileExtension(filePath: string, defaultExtension = '.ts') {
  return filePath + (path.extname(filePath) ? '' : defaultExtension)
}

function formatTsReExportFile(importName: string) {
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

function formatCssReExportFile(importName: string) {
  return `@import '${importName}';\n`
}
