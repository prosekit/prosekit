import {
  union,
  type Union,
} from '@prosekit/core'

import {
  defineColorCommands,
  type ColorCommandsExtension,
} from './color-commands'
import {
  defineColorSpec,
  type ColorSpecExtension,
} from './color-spec'

/**
 * @internal
 */
export type ColorExtension = Union<[ColorSpecExtension, ColorCommandsExtension]>

/**
 * Defines the `color` mark and some commands for it.
 *
 * @public
 */
export function defineColor(): ColorExtension {
  return union(
    defineColorSpec(),
    defineColorCommands(),
  )
}
