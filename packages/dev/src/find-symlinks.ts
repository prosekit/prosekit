import path from 'node:path'

import fs from 'fs-extra'

/**
 * Finds all symlinks in the given directory.
 *
 * @param absDir Absolute path to the directory to search
 * @returns Array of absolute paths to symlinks found
 * @throws Error if the path is not absolute or not a directory
 */
export async function findSymlinks(absDir: string): Promise<string[]> {
  // Ensure absDir is absolute
  if (!path.isAbsolute(absDir)) {
    throw new Error(`Directory path must be absolute: ${absDir}`)
  }

  // Check if it's a directory
  const stats = await fs.stat(absDir)
  if (!stats.isDirectory()) {
    throw new Error(`Not a directory: ${absDir}`)
  }

  // Get and return absolute paths to all symlinks
  const symlinks: string[] = []
  await findSymlinksImpl(absDir, symlinks)
  return symlinks
}

// Internal recursive implementation
async function findSymlinksImpl(dir: string, result: string[]): Promise<void> {
  const entries = await fs.readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isSymbolicLink()) {
      result.push(fullPath)
    } else if (entry.isDirectory()) {
      await findSymlinksImpl(fullPath, result)
    }
  }
}
