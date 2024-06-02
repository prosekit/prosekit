import path from 'node:path'

import { execa } from 'execa'
import { globby } from 'globby'
import { pathExists } from 'path-exists'

import { findRootDir } from './find-root-dir.js'

async function listFilesWithGit(dir: string) {
  const { stdout } = await execa(
    'git',
    [
      'ls-files',

      // Include tracked files
      '--cached',

      // Include untracked files
      '--others',

      // Exclude the files that are ignored by `.gitignore`.
      '--exclude-standard',
    ],
    { cwd: dir },
  )
  const filePaths = stdout
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line)

  const existingFilePaths: string[] = []
  const rootDir = await findRootDir()

  await Promise.all(
    filePaths.map(async (filePath) => {
      if (await pathExists(path.join(rootDir, filePath))) {
        existingFilePaths.push(filePath)
      }
    }),
  )

  return existingFilePaths.sort()
}

async function listFilesWithGlobby(dir: string) {
  const files = await globby('**', {
    cwd: dir,
    ignore: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.git/**',
      '**/temp/**',
      '**/_/**',
    ],
  })
  return files.sort()
}

export async function listGitFiles(dir: string): Promise<string[]> {
  // Some environments like stackblitz don't have git installed, so we fall back to globby.
  try {
    return await listFilesWithGit(dir)
  } catch (e) {
    console.warn('Failed to list files with git, falling back to globby:', e)
    return await listFilesWithGlobby(dir)
  }
}
