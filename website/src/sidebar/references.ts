import fs from 'node:fs'
import path from 'node:path'

import sidebar from './references.gen.json' with { type: 'json' }

const REF_DIR = path.join('src', 'content', 'docs', 'references')

export function generateReferencesSidebar() {
  if (!fs.existsSync(REF_DIR)) return []
  if (fs.globSync('**/*.{md,mdx}', { cwd: REF_DIR }).length === 0) return []
  return sidebar
}
