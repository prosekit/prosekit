import path from 'node:path'

export function skipGen(): boolean {
  // Skip on Windows
  if (path.sep !== '/') {
    console.warn('Skip generation on Windows')
    return true
  }

  return false
}
