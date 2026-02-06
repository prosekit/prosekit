import { union, type Union } from '@prosekit/core'

import { defineCodeBlockCommands, type CodeBlockCommandsExtension } from './code-block-commands'
import { defineCodeBlockEnterRule, defineCodeBlockInputRule } from './code-block-input-rule'
import { defineCodeBlockKeymap } from './code-block-keymap'
import { defineCodeBlockSpec, type CodeBlockSpecExtension } from './code-block-spec'

/**
 * @internal
 */
export type CodeBlockExtension = Union<
  [CodeBlockSpecExtension, CodeBlockCommandsExtension]
>

/**
 * Adds `codeBlock` nodes to the editor. This includes the following extensions:
 *
 * - {@link defineCodeBlockSpec}
 * - {@link defineCodeBlockInputRule}
 * - {@link defineCodeBlockEnterRule}
 * - {@link defineCodeBlockKeymap}
 * - {@link defineCodeBlockCommands}.
 *
 * @public
 */
export function defineCodeBlock(): CodeBlockExtension {
  return union(
    defineCodeBlockSpec(),
    defineCodeBlockInputRule(),
    defineCodeBlockEnterRule(),
    defineCodeBlockKeymap(),
    defineCodeBlockCommands(),
  )
}
