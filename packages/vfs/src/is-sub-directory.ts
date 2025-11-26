import path from 'node:path'

/**
 * Checks whether child is located inside parent.
 */
export function isSubDirectory(parent: string, child: string) {
  const relativePath = path.relative(parent, child)
  return (
    relativePath !== ''
    && !relativePath.startsWith('..')
    && !path.isAbsolute(relativePath)
  )
}
