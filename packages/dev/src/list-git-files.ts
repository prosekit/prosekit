import path from 'node:path'

import { execa } from 'execa'
import { pathExists } from 'path-exists'

import { findRootDir } from './find-root-dir'

function splitLines(stdout: string): string[] {
  return stdout
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

async function findFilesWithGit(dir: string): Promise<string[]> {
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
  return splitLines(stdout)
}

async function findFilesWithGitFallback(dir: string): Promise<string[]> {
  const { stdout } = await execa('git', ['ls-files'], { cwd: dir })
  return splitLines(stdout)
}

async function findFiles(dir: string): Promise<string[]> {
  try {
    return await findFilesWithGit(dir)
  } catch {
    // Some older versions of git don't support `--others` and `--exclude-standard`
    return await findFilesWithGitFallback(dir)
  }
}

export async function listGitFiles(dir: string): Promise<string[]> {
  const filePaths = await findFiles(dir)

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
