import { findRoot } from '@manypkg/find-root'

let rootDir: string | null = null

export async function findRootDir() {
  if (!rootDir) {
    const root = await findRoot(process.cwd())
    rootDir = root.rootDir
  }
  return rootDir
}
