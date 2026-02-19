import { union, type Union } from '@prosekit/core'

import { defineCodeCommands, type CodeCommandsExtension } from './code-commands.ts'
import { defineCodeInputRule } from './code-input-rule.ts'
import { defineCodeKeymap } from './code-keymap.ts'
import { defineCodeSpec, type CodeSpecExtension } from './code-spec.ts'

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
