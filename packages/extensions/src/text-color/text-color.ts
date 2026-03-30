import { union, type Union } from '@prosekit/core'

import { defineTextColorCommands, type TextColorCommandsExtension } from './text-color-commands.ts'
import { defineTextColorSpec, type TextColorSpecExtension } from './text-color-spec.ts'

/**
 * @internal
 */
export type TextColorExtension = Union<[TextColorSpecExtension, TextColorCommandsExtension]>

/**
 * Defines the `textColor` mark and some commands for it.
 *
 * @public
 */
export function defineTextColor(): TextColorExtension {
  return union(
    defineTextColorSpec(),
    defineTextColorCommands(),
  )
}
