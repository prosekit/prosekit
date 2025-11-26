import { normalize } from 'node:path'

import { globby } from 'globby'

export interface ListGitFilesOptions {
  readonly patterns?: string | string[]
}

/** Returns sorted file paths relative to the repo root respecting .gitignore. */
export async function listGitFiles(rootDir: string, options: ListGitFilesOptions = {}) {
  const patterns = Array.isArray(options.patterns)
    ? options.patterns
    : options.patterns
    ? [options.patterns]
    : ['**/*']

  const files = await globby(patterns, {
    cwd: rootDir,
    dot: true,
    absolute: false,
    gitignore: true,
    onlyFiles: true,
    followSymbolicLinks: false,
  })

  return files.map((file) => normalize(file)).sort()
}
