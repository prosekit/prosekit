import fs from 'node:fs'
import path from 'node:path'

import sidebarJson from './references.gen.json' with { type: 'json' }

const DOCS_DIR = path.join('src', 'content', 'docs')

const expectedItems = new Set<string>()
for (const item of sidebarJson) {
  if (typeof item === 'string') {
    expectedItems.add(item)
  } else {
    for (const slug of item.items) {
      expectedItems.add(slug)
    }
  }
}

export function generateReferencesSidebar() {
  const availableItems = new Set(
    fs.globSync('references/**/*.{md,mdx}', { cwd: DOCS_DIR })
      .map(f => f.replaceAll(path.sep, '/').replace(/\.mdx?$/, '').replaceAll('.', '')),
  )

  const missingItems = [...expectedItems].filter(item => !availableItems.has(item))

  if (missingItems.length > 0) {
    const message = `[${import.meta.filename}] Warning: Missing sidebar items:\n\n${missingItems.slice(0, 5).join('\n')}\n`
    if (process.env.CI) {
      throw new Error(message)
    } else {
      console.warn(message)
    }
    return []
  }

  return sidebarJson
}
