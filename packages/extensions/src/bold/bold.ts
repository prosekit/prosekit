import { union, type Union } from '@prosekit/core'

import { defineBoldCommands, type BoldCommandsExtension } from './bold-commands.ts'
import { defineBoldInputRule } from './bold-input-rule.ts'
import { defineBoldKeymap } from './bold-keymap.ts'
import { defineBoldSpec, type BoldSpecExtension } from './bold-spec.ts'

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
