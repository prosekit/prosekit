import { union, type Union } from '@prosekit/core'

import { defineBlockquoteCommands, type BlockquoteCommandsExtension } from './blockquote-commands'
import { defineBlockquoteInputRule } from './blockquote-input-rule'
import { defineBlockquoteKeymap } from './blockquote-keymap'
import { defineBlockquoteSpec, type BlockquoteSpecExtension } from './blockquote-spec'

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
