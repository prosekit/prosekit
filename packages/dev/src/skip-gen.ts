import path from 'node:path'

export function skipGen(): boolean {
  // Skip on Windows
  if (path.sep !== '/') {
    console.warn('Skip generation on Windows')
    return true
  }

  if (process.env.CI) {
    console.warn('Skip generation on CI')
    return true
  }

  return false
}
