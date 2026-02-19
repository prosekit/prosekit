import { union, type Union } from '@prosekit/core'

import { defineItalicCommands, type ItalicCommandsExtension } from './italic-commands.ts'
import { defineItalicInputRule } from './italic-input-rule.ts'
import { defineItalicKeymap } from './italic-keymap.ts'
import { defineItalicSpec, type ItalicSpecExtension } from './italic-spec.ts'

/**
 * @internal
 */
export type ItalicExtension = Union<
  [ItalicSpecExtension, ItalicCommandsExtension]
>

/**
 * @public
 */
export function defineItalic(): ItalicExtension {
  return union(
    defineItalicSpec(),
    defineItalicCommands(),
    defineItalicKeymap(),
    defineItalicInputRule(),
  )
}
