import fs from 'node:fs'

import * as Classes from './src/classes'

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

fs.writeFileSync('lib/classes.gen.json', code)
