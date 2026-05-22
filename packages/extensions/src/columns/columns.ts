import { union, type Union } from '@prosekit/core'

import { defineColumnsCommands, type ColumnsCommandsExtension } from './columns-commands.ts'
import { defineColumnsKeymap, type ColumnsKeymapExtension } from './columns-keymap.ts'
import { defineColumnsPlugin, type ColumnsPluginExtension } from './columns-plugin.ts'
import { defineColumnSpec, defineColumnsSpec, type ColumnSpecExtension, type ColumnsSpecExtension } from './columns-spec.ts'
import type { ColumnsOptions } from './columns-types.ts'

/**
 * @internal
 */
export type ColumnsExtension = Union<
  [
    ColumnsSpecExtension,
    ColumnSpecExtension,
    ColumnsCommandsExtension,
    ColumnsPluginExtension,
    ColumnsKeymapExtension,
  ]
>

export function defineColumns(options: ColumnsOptions = {}): ColumnsExtension {
  return union(
    defineColumnsSpec(),
    defineColumnSpec(),
    defineColumnsPlugin(),
    defineColumnsCommands(options),
    defineColumnsKeymap(options),
  )
}
