import { findRoot } from '@manypkg/find-root'

export const ROOT_DIR: string = (await findRoot(process.cwd())).rootDir
