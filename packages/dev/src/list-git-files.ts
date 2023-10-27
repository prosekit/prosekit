import { execa } from 'execa'

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
  return stdout
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line)
    .sort()
}
