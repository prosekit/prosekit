import fs from 'node:fs'
import path from 'node:path'
import { isDeepStrictEqual } from 'node:util'

import * as Classes from './classes'

const code = JSON.stringify(Classes, null, 2) + '\n'

for (const [key, value] of Object.entries(Classes)) {
  if (!key.startsWith('CSS_')) {
    throw new Error(`Class name must start with CSS_`)
  }
  if (value.includes(`'`)) {
    throw new Error(`Class name ${key} must not contain '`)
  }
  if (value.includes(`"`)) {
    throw new Error(`Class name ${key} must not contain "`)
  }
  if (value.includes('`')) {
    throw new Error(`Class name ${key} must not contain \``)
  }
}

const filePath = path.join(import.meta.dirname, 'classes.gen.json')
let needWrite = true
if (fs.existsSync(filePath)) {
  try {
    const existing = JSON.parse(fs.readFileSync(filePath, 'utf8')) as Record<string, string>
    needWrite = !isDeepStrictEqual(existing, Classes)
  } catch (err) {
    console.warn(`Failed to read or parse existing ${filePath}:`, err)
  }
}

if (needWrite) {
  fs.writeFileSync(filePath, code)
}
