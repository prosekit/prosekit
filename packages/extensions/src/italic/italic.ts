import { type Union, union } from '@prosekit/core'

import {
  type ItalicCommandsExtension,
  defineItalicCommands,
} from './italic-commands'
import { defineItalicInputRule } from './italic-input-rule'
import { defineItalicKeymap } from './italic-keymap'
import { type ItalicSpecExtension, defineItalicSpec } from './italic-spec'

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
