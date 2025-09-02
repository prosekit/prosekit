import fs from 'node:fs'
import path from 'node:path'

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

fs.writeFileSync(path.join(import.meta.dirname, 'classes.gen.json'), code)
