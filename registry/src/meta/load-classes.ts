import fs from 'node:fs'
import path from 'node:path'

import { exec } from 'tinyexec'

import { ROOT_DIR } from './root-dir'

const CLASS_JSON_PATH = path.join(ROOT_DIR, 'registry/src/classes.gen.json')

let cachedClasses: Record<string, string> | undefined

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
  await exec('pnpm', ['run', 'gen:classes'], {
    timeout: 10_000,
    throwOnError: true,
    nodeOptions: { cwd: path.join(ROOT_DIR, 'registry') },
  })
  cachedClasses = undefined
}
