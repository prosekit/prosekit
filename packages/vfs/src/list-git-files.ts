import {
  join,
  normalize,
  resolve,
} from 'node:path'

import { execa } from 'execa'
import { pathExists } from 'path-exists'

import { debug } from './debug'

const gitFileListCache = new Map<string, Promise<string[]>>()

async function runGit(dir: string): Promise<string> {
  const args = [
    'ls-files',
    '--cached', // include tracked files
    '--others', // include untracked files
    '--exclude-standard', // respect .gitignore
  ]
  try {
    const { stdout } = await execa('git', args, { cwd: dir })
    return stdout
  } catch (error) {
    console.warn(`Failed to run "git ${args.join(' ')}" in ${dir}:`, error)
    const { stdout } = await execa('git', ['ls-files'], { cwd: dir })
    return stdout
  }
}

async function loadGitFiles(rootDir: string): Promise<string[]> {
  debug('loadGitFiles start rootDir=%o', rootDir)
  const stdout = await runGit(rootDir)
  const lines = stdout
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  const existing = await Promise.all(
    lines.map(async (filePath) => {
      if (await pathExists(join(rootDir, filePath))) {
        return normalize(filePath)
      }
      return null
    }),
  )
  const files = existing.filter((filePath): filePath is string => Boolean(filePath)).sort()
  debug('loadGitFiles done files=%d', files.length)
  return files
}

export function listGitFiles(cwd: string): Promise<string[]> {
  const rootDir = resolve(cwd)
  let promise = gitFileListCache.get(rootDir)
  if (!promise) {
    promise = loadGitFiles(rootDir)
    gitFileListCache.set(rootDir, promise)
  }
  return promise
}
