import { union, type Union } from '@prosekit/core'

import { defineBackgroundColorCommands, type BackgroundColorCommandsExtension } from './background-color-commands.ts'
import { defineBackgroundColorSpec, type BackgroundColorSpecExtension } from './background-color-spec.ts'

/**
 * @internal
 */
export type BackgroundColorExtension = Union<[BackgroundColorSpecExtension, BackgroundColorCommandsExtension]>

/**
 * Defines the `backgroundColor` mark and some commands for it.
 *
 * @public
 */
export function defineBackgroundColor(): BackgroundColorExtension {
  return union(
    defineBackgroundColorSpec(),
    defineBackgroundColorCommands(),
  )
}
