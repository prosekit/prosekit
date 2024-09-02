import { union, type Union } from '@prosekit/core'

import {
  defineBlockquoteCommands,
  type BlockquoteCommandsExtension,
} from './commands'
import { defineBlockquoteInputRule } from './input-rule'
import { defineBlockquoteKeymap } from './keymap'
import { defineBlockquoteSpec, type BlockquoteSpecExtension } from './spec'

/**
 * @internal
 */
export type BlockquoteExtension = Union<
  [BlockquoteSpecExtension, BlockquoteCommandsExtension]
>

/**
 * @public
 */
export function defineBlockquote(): BlockquoteExtension {
  return union(
    defineBlockquoteSpec(),
    defineBlockquoteInputRule(),
    defineBlockquoteCommands(),
    defineBlockquoteKeymap(),
  )
}

export {
  defineBlockquoteSpec,
  defineBlockquoteInputRule,
  defineBlockquoteCommands,
  defineBlockquoteKeymap,
  type BlockquoteSpecExtension,
  type BlockquoteCommandsExtension,
}
