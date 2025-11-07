import { vfs } from '@prosekit/dev'

import * as Classes from '../classes'

function validateClasses() {
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
}

export async function updateClasses() {
  validateClasses()
  await vfs.updateJSON('registry/src/classes.gen.json', Classes)
}
