import type { Package } from '@manypkg/get-packages'

export function isPublicPackage(pkg: Package): boolean {
  return !isPrivatePackage(pkg)
}

export function isPrivatePackage(pkg: Package): boolean {
  return pkg.packageJson.private ?? false
}
