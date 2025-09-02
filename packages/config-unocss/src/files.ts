import fs from 'node:fs'
import path from 'node:path'

import { findRootSync } from '@manypkg/find-root'

function getRoot(): string {
  return findRootSync(import.meta.dirname).rootDir
}

export function getWatchFilePaths({ includeClasses = true }: { includeClasses?: boolean } = {}): string[] {
  const root = getRoot()
  return [
    'index.ts',
    ...(includeClasses ? ['classes.ts'] : []),
  ].map(
    file => path.join(root, 'packages/config-unocss/src', file),
  )
}

export function loadClasses(): Record<string, string> {
  const root = getRoot()
  const filePath = path.join(root, 'packages/config-unocss/lib/classes.gen.json')
  const content = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(content) as Record<string, string>
}
