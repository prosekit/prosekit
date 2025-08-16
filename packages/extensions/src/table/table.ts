import {
  union,
  type Union,
} from '@prosekit/core'

import {
  defineTableCommands,
  type TableCommandsExtension,
} from './table-commands'
import { defineTableDropIndicator } from './table-drop-indicator'
import { defineTablePlugins } from './table-plugins'
import {
  defineTableCellSpec,
  defineTableHeaderCellSpec,
  defineTableRowSpec,
  defineTableSpec,
  type TableCellSpecExtension,
  type TableHeaderCellSpecExtension,
  type TableRowSpecExtension,
  type TableSpecExtension,
} from './table-spec'

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
