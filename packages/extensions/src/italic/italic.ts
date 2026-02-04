import { union, type Union } from '@prosekit/core'

import { defineItalicCommands, type ItalicCommandsExtension } from './italic-commands'
import { defineItalicInputRule } from './italic-input-rule'
import { defineItalicKeymap } from './italic-keymap'
import { defineItalicSpec, type ItalicSpecExtension } from './italic-spec'

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
