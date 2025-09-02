import fs from 'node:fs'
import path from 'node:path'

import { exec } from 'tinyexec'

let cachedClasses: Record<string, string> | undefined

const CLASS_JSON_PATH = path.join(import.meta.dirname, 'classes.gen.json')

export function getClasses(): Record<string, string> {
  if (!cachedClasses) {
    cachedClasses = loadClasses()
  }
  return cachedClasses
}

function loadClasses(): Record<string, string> {
  const json = fs.readFileSync(CLASS_JSON_PATH, 'utf-8')
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
