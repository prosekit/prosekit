/* eslint-disable @typescript-eslint/no-unsafe-return */
import { readFile } from 'node:fs/promises'

import JSON5 from 'json5'
import { pathExists } from 'path-exists'

export async function readJson(filePath: string) {
  if (await pathExists(filePath)) {
    const content = await readFile(filePath, 'utf-8')
    try {
      return JSON5.parse(content)
    } catch   {
      throw new Error(`Failed to parse ${filePath}`)
    }
  }
  throw new Error(`${filePath} doesn't exist`)
}
