import { findRootSync } from '@manypkg/find-root'

export const ROOT_DIR: string = findRootSync(process.cwd()).rootDir
