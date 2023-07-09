import { execa } from 'execa'

export async function listGitFiles(dir: string) {
  const { stdout } = await execa('git', ['ls-files'], { cwd: dir })
  return stdout
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line)
    .sort()
}
