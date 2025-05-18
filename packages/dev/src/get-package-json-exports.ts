import type { Package } from '@manypkg/get-packages'
import type { PackageJson } from 'type-fest'

export function getPackageJsonExports(pkg: Package): Record<string, string | Record<string, string>> | undefined {
  const packageJson = pkg.packageJson as PackageJson
  const exports = packageJson.exports
  if (!exports) {
    return undefined
  }
  return exports as Record<string, string | Record<string, string>>
}

export function getPackageJsonPublishExports(pkg: Package): Record<string, string | Record<string, string>> | undefined {
  const packageJson = pkg.packageJson as PackageJson
  const exports = packageJson.publishConfig?.exports
  if (!exports) {
    return undefined
  }
  return exports as Record<string, string | Record<string, string>>
}
