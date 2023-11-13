import fs from 'node:fs/promises'

import { pathExists } from 'path-exists'

export async function removePath(path: string): Promise<boolean> {
  if (await pathExists(path)) {
    await fs.rm(path, { force: true })
    return true
  }
  return false
}
