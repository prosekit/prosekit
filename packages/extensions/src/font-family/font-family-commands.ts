import { addMark, defineCommands, removeMark, type Extension } from '@prosekit/core'
import type { Command } from '@prosekit/pm/state'

import type { FontFamilyAttrs } from './font-family-spec.ts'

/**
 * @internal
 */
export function addFontFamily(attrs: FontFamilyAttrs): Command {
  return addMark({ type: 'fontFamily', attrs })
}

/**
 * @internal
 */
export function removeFontFamily(): Command {
  return removeMark({ type: 'fontFamily' })
}

/**
 * @internal
 */
export type FontFamilyCommandsExtension = Extension<{
  Commands: {
    addFontFamily: [attrs: FontFamilyAttrs]
    removeFontFamily: []
  }
}>

/**
 * @internal
 */
export function defineFontFamilyCommands(): FontFamilyCommandsExtension {
  return defineCommands({ addFontFamily, removeFontFamily })
}
