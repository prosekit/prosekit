import { union, type Union } from '@prosekit/core'

import { defineFontFamilyCommands, type FontFamilyCommandsExtension } from './font-family-commands.ts'
import { defineFontFamilySpec, type FontFamilySpecExtension } from './font-family-spec.ts'

/**
 * @internal
 */
export type FontFamilyExtension = Union<[FontFamilySpecExtension, FontFamilyCommandsExtension]>

/**
 * Defines the `fontFamily` mark and some commands for it.
 */
export function defineFontFamily(): FontFamilyExtension {
  return union(
    defineFontFamilySpec(),
    defineFontFamilyCommands(),
  )
}
