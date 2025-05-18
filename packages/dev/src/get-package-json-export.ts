import type { Package } from '@manypkg/get-packages'
import type { PackageJson } from 'type-fest'

export function getPackageJsonExport(pkg: Package): Record<string, string | Record<string, string>> {
  const packageJson = pkg.packageJson as PackageJson
  const exports = packageJson.exports || {}
  if (!packageJson.exports) {
    packageJson.exports = exports
  }
  return exports as Record<string, string | Record<string, string>>
}
