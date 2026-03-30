import { union, type Union } from '@prosekit/core'

import { defineCodeBlockCommands, type CodeBlockCommandsExtension } from './code-block-commands.ts'
import { defineCodeBlockEnterRule, defineCodeBlockInputRule } from './code-block-input-rule.ts'
import { defineCodeBlockKeymap } from './code-block-keymap.ts'
import { defineCodeBlockSpec, type CodeBlockSpecExtension } from './code-block-spec.ts'

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
