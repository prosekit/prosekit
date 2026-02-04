import { union, type Union } from '@prosekit/core'

import { defineBoldCommands, type BoldCommandsExtension } from './bold-commands'
import { defineBoldInputRule } from './bold-input-rule'
import { defineBoldKeymap } from './bold-keymap'
import { defineBoldSpec, type BoldSpecExtension } from './bold-spec'

/**
 * @internal
 */
export type BoldExtension = Union<[BoldSpecExtension, BoldCommandsExtension]>

/**
 * @public
 */
export function defineBold(): BoldExtension {
  return union(
    defineBoldSpec(),
    defineBoldCommands(),
    defineBoldKeymap(),
    defineBoldInputRule(),
  )
}
