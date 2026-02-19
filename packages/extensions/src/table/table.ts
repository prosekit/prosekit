import { union, type Union } from '@prosekit/core'

import { defineTableCommands, type TableCommandsExtension } from './table-commands.ts'
import { defineTableDropIndicator } from './table-drop-indicator.ts'
import { defineTablePlugins } from './table-plugins.ts'
import {
  defineTableCellSpec,
  defineTableHeaderCellSpec,
  defineTableRowSpec,
  defineTableSpec,
  type TableCellSpecExtension,
  type TableHeaderCellSpecExtension,
  type TableRowSpecExtension,
  type TableSpecExtension,
} from './table-spec.ts'

/**
 * @internal
 */
export type TableExtension = Union<
  [
    TableSpecExtension,
    TableRowSpecExtension,
    TableCellSpecExtension,
    TableHeaderCellSpecExtension,
    TableCommandsExtension,
  ]
>

/**
 * @public
 */
export function defineTable(): TableExtension {
  return union(
    defineTableSpec(),
    defineTableRowSpec(),
    defineTableCellSpec(),
    defineTableHeaderCellSpec(),
    defineTablePlugins(),
    defineTableCommands(),
    defineTableDropIndicator(),
  )
}
