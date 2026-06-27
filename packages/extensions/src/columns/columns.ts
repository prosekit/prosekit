import { union, type Union } from '@prosekit/core'

import { defineColumnGroupCommands, type ColumnGroupCommandsExtension } from './columns-commands.ts'
import { defineColumnGroupPlugin, type ColumnGroupPluginExtension } from './columns-plugin.ts'
import {
  defineColumnGroupNodeView,
  defineColumnGroupSpec,
  defineColumnNodeView,
  defineColumnSpec,
  type ColumnGroupNodeViewExtension,
  type ColumnGroupSpecExtension,
  type ColumnNodeViewExtension,
  type ColumnSpecExtension,
} from './columns-spec.ts'
import type { ColumnGroupOptions } from './columns-types.ts'

/**
 * @internal
 */
export type ColumnGroupExtension = Union<
  [
    ColumnGroupSpecExtension,
    ColumnGroupNodeViewExtension,
    ColumnSpecExtension,
    ColumnNodeViewExtension,
    ColumnGroupCommandsExtension,
    ColumnGroupPluginExtension,
  ]
>

/**
 * Define a two-level block structure composed of a `columnGroup` container and one
 * or more `column` children.
 *
 * This extension includes:
 *
 * - node specs for `columnGroup` and `column`
 * - commands for inserting, resizing, distributing, and removing columns
 * - plugin state for column resize UI
 */
export function defineColumnGroup(options: ColumnGroupOptions = {}): ColumnGroupExtension {
  return union(
    defineColumnGroupSpec(),
    defineColumnGroupNodeView(),
    defineColumnSpec(),
    defineColumnNodeView(),
    defineColumnGroupPlugin({
      handleWidth: options.handleWidth,
      defaultColumnWidth: options.defaultColumnWidth,
      maxColumns: options.maxColumns,
    }),
    defineColumnGroupCommands(options),
  )
}
