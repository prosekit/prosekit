import { definePlugin, union } from '@prosekit/core'
import { columnResizing, tableEditing } from 'prosemirror-tables'

import { defineTableCommands } from './table-commands'
import {
  defineTableCellSpec,
  defineTableHeaderCellSpec,
  defineTableRowSpec,
  defineTableSpec,
} from './table-spec'

function defineTablePlugins() {
  return definePlugin([tableEditing(), columnResizing()])
}

/**
 * @public
 */
export function defineTable() {
  return union([
    defineTableSpec(),
    defineTableRowSpec(),
    defineTableCellSpec(),
    defineTableHeaderCellSpec(),
    defineTablePlugins(),
    defineTableCommands(),
  ])
}

export {
  defineTableCellSpec,
  defineTableCommands,
  defineTableHeaderCellSpec,
  defineTablePlugins,
  defineTableRowSpec,
  defineTableSpec,
}
