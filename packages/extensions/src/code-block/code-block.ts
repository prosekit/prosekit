import { union } from '@prosekit/core'

import { defineCodeBlockCommands } from './code-block-commands'
import {
  defineCodeBlockEnterRule,
  defineCodeBlockInputRule,
} from './code-block-input-rule'
import { defineCodeBlockKeymap } from './code-block-keymap'
import { defineCodeBlockSpec } from './code-block-spec'

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
export function defineCodeBlock() {
  return union([
    defineCodeBlockSpec(),
    defineCodeBlockInputRule(),
    defineCodeBlockEnterRule(),
    defineCodeBlockKeymap(),
    defineCodeBlockCommands(),
  ])
}
