import fs from 'node:fs'
import path from 'node:path'

import { findRoot } from '@manypkg/find-root'
import { exec } from 'tinyexec'

const rootDir: string = (await findRoot(process.cwd())).rootDir
const cwd = path.join(rootDir, 'registry')

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
  await exec('pnpm', ['run', 'gen:classes'], {
    timeout: 10_000,
    throwOnError: true,
    nodeOptions: { cwd },
  })
  cachedClasses = undefined
}
