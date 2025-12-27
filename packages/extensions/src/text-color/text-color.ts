import {
  union,
  type Union,
} from '@prosekit/core'

import {
  defineTextColorCommands,
  type TextColorCommandsExtension,
} from './text-color-commands'
import {
  defineTextColorSpec,
  type TextColorSpecExtension,
} from './text-color-spec'

/**
 * @internal
 */
export type TextColorExtension = Union<[TextColorSpecExtension, TextColorCommandsExtension]>

/**
 * Defines the `color` mark and some commands for it.
 *
 * @public
 */
export function defineTextColor(): TextColorExtension {
  return union(
    defineTextColorSpec(),
    defineTextColorCommands(),
  )
}
