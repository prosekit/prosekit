import { normalize } from 'node:path'

import { globby } from 'globby'

/** Returns sorted file paths relative to the repo root respecting .gitignore. */
export async function listGitFiles(rootDir: string) {
  const files = await globby('**/*', {
    cwd: rootDir,
    dot: true,
    absolute: false,
    gitignore: true,
    onlyFiles: true,
    followSymbolicLinks: false,
  })

  return files.map((file) => normalize(file)).sort()
}
