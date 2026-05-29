import { union, type Union } from '@prosekit/core'

import { defineColumnsCommands, type ColumnsCommandsExtension } from './columns-commands.ts'
import { defineColumnsPlugin, type ColumnsPluginExtension } from './columns-plugin.ts'
import { defineColumnNodeView, defineColumnSpec, defineColumnsSpec, type ColumnNodeViewExtension, type ColumnSpecExtension, type ColumnsSpecExtension } from './columns-spec.ts'
import type { ColumnsOptions } from './columns-types.ts'

/**
 * @internal
 */
export type ColumnsExtension = Union<
  [
    ColumnsSpecExtension,
    ColumnSpecExtension,
    ColumnNodeViewExtension,
    ColumnsCommandsExtension,
    ColumnsPluginExtension,
  ]
>

/**
 * Define a two-level block structure composed of a `columns` container and one
 * or more `column` children.
 *
 * This extension includes:
 *
 * - node specs for `columns` and `column`
 * - commands for inserting, resizing, distributing, and removing columns
 * - plugin state for column resize UI
 */
export function defineColumns(options: ColumnsOptions = {}): ColumnsExtension {
  return union(
    defineColumnsSpec(),
    defineColumnSpec(),
    defineColumnNodeView(),
    defineColumnsPlugin({
      handleWidth: options.handleWidth,
    }),
    defineColumnsCommands(options),
  )
}
