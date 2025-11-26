import { normalize } from 'node:path'

import { globby } from 'globby'

import { debug } from './debug'

export interface ListGitFilesOptions {
  readonly patterns?: string | string[]
}

/** Returns sorted file paths relative to the repo root respecting .gitignore. */
export async function listGitFiles(cwd: string, options: ListGitFilesOptions = {}) {
  debug('listGitFiles start cwd=%o patterns=%o', cwd, options.patterns)
  const patterns = Array.isArray(options.patterns)
    ? options.patterns
    : options.patterns
    ? [options.patterns]
    : ['**/*']

  const files = await globby(patterns, {
    cwd,
    dot: true,
    absolute: false,
    gitignore: true,
    onlyFiles: true,
    followSymbolicLinks: false,
  })

  const sortedFiles = files.map((file) => normalize(file)).sort()
  debug('listGitFiles done files=%d', sortedFiles.length)
  return sortedFiles
}
