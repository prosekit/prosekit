import { union, type Union } from '@prosekit/core'

import { defineCodeCommands, type CodeCommandsExtension } from './code-commands'
import { defineCodeInputRule } from './code-input-rule'
import { defineCodeKeymap } from './code-keymap'
import { defineCodeSpec, type CodeSpecExtension } from './code-spec'

/**
 * @internal
 */
export type CodeExtension = Union<[CodeSpecExtension, CodeCommandsExtension]>

/**
 * @public
 */
export function defineCode(): CodeExtension {
  return union(
    defineCodeSpec(),
    defineCodeCommands(),
    defineCodeKeymap(),
    defineCodeInputRule(),
  )
}
