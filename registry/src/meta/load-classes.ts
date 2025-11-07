import fs from 'node:fs'
import path from 'node:path'

import { vfs } from '@prosekit/dev'
import { exec } from 'tinyexec'

const rootDir = await vfs.getRootDir()

const CLASS_JSON_PATH = 'registry/src/classes.gen.json'

let cachedClasses: Record<string, string> | undefined

export function getClasses(): Record<string, string> {
  if (!cachedClasses) {
    cachedClasses = loadClasses()
  }
  return cachedClasses
}

function loadClasses(): Record<string, string> {
  const filePath = path.join(rootDir, CLASS_JSON_PATH)
  const json = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(json) as Record<string, string>
}

export async function refreshClasses() {
  cachedClasses = undefined
  await exec('pnpm', ['run', '-w', 'build:css'], {
    timeout: 10_000,
    throwOnError: true,
  })
  cachedClasses = undefined
}
