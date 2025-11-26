import fs from 'node:fs/promises'
import path from 'node:path'
import { isDeepStrictEqual } from 'node:util'

import JSON5 from 'json5'
import { pathExists } from 'path-exists'

/**
 * Removes a path if it exists.
 */
export async function removePath(filePath: string) {
  if (await pathExists(filePath)) {
    await fs.rm(filePath, { force: true })
    return true
  }
  return false
}

/**
 * Writes JSON to disk only when contents change.
 */
export async function writeJson(filePath: string, json: unknown) {
  let previous: unknown
  let hadPrevious = true
  try {
    const text = await fs.readFile(filePath, 'utf8')
    previous = JSON5.parse(text)
  } catch {
    previous = undefined
    hadPrevious = false
  }

  if (previous !== undefined && isDeepStrictEqual(previous, json)) {
    return false
  }
  if (!hadPrevious) {
    await ensureDir(path.dirname(filePath))
  }
  await fs.writeFile(filePath, JSON.stringify(json, null, 2) + '\n')
  return true
}

/**
 * Writes text to disk only when contents change.
 */
export async function writeText(filePath: string, text: string) {
  let previous: string | null = null
  try {
    previous = await fs.readFile(filePath, 'utf8')
  } catch {
    previous = null
  }
  if (previous === text) {
    return false
  }
  if (previous === null) {
    await ensureDir(path.dirname(filePath))
  }
  await fs.writeFile(filePath, text)
  return true
}

/**
 * Ensures the parent directory exists.
 */
async function ensureDir(dirPath: string) {
  await fs.mkdir(dirPath, { recursive: true })
}
