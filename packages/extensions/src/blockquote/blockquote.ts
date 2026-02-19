import { union, type Union } from '@prosekit/core'

import { defineBlockquoteCommands, type BlockquoteCommandsExtension } from './blockquote-commands.ts'
import { defineBlockquoteInputRule } from './blockquote-input-rule.ts'
import { defineBlockquoteKeymap } from './blockquote-keymap.ts'
import { defineBlockquoteSpec, type BlockquoteSpecExtension } from './blockquote-spec.ts'

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
