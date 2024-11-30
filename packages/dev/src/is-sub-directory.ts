import path from 'node:path'

export function isSubDirectory(parent: string, child: string) {
  const relativePath = path.relative(parent, child)
  return (
    relativePath
    && !relativePath.startsWith('..')
    && !path.isAbsolute(relativePath)
  )
}
