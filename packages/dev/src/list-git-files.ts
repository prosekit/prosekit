import path from 'node:path'

import { execa } from 'execa'
import { pathExists } from 'path-exists'

import { findRootDir } from './find-root-dir.js'

export async function listGitFiles(dir: string) {
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
