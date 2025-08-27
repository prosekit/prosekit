import {
  defineCommands,
  type Extension,
} from '@prosekit/core'
import {
  addColumnAfter,
  addColumnBefore,
  addRowAfter,
  addRowBefore,
  deleteCellSelection,
  deleteColumn,
  deleteRow,
  deleteTable,
  mergeCells,
  splitCell,
} from 'prosemirror-tables'

import { exitTable } from './table-commands/exit-table'
import {
  insertTable,
  type InsertTableOptions,
} from './table-commands/insert-table'
import {
  moveTableColumn,
  type MoveTableColumnOptions,
} from './table-commands/move-table-column'
import {
  moveTableRow,
  type MoveTableRowOptions,
} from './table-commands/move-table-row'
import {
  selectTable,
  type SelectTableOptions,
} from './table-commands/select-table'
import {
  selectTableCell,
  type SelectTableCellOptions,
} from './table-commands/select-table-cell'
import {
  selectTableColumn,
  type SelectTableColumnOptions,
} from './table-commands/select-table-column'
import {
  selectTableRow,
  type SelectTableRowOptions,
} from './table-commands/select-table-row'

/**
 * @internal
 */
export type TableCommandsExtension = Extension<{
  Commands: {
    insertTable: [options: InsertTableOptions]
    exitTable: []

    selectTable: [options?: SelectTableOptions]
    selectTableCell: [options?: SelectTableCellOptions]
    selectTableColumn: [options?: SelectTableColumnOptions]
    selectTableRow: [options?: SelectTableRowOptions]

    addTableColumnBefore: []
    addTableColumnAfter: []
    addTableRowAbove: []
    addTableRowBelow: []

    deleteTable: []
    deleteTableColumn: []
    deleteTableRow: []
    deleteCellSelection: []

    mergeTableCells: []
    splitTableCell: []

    moveTableRow: [options: MoveTableRowOptions]
    moveTableColumn: [options: MoveTableColumnOptions]
  }
}>

/**
 * Adds commands for working with `table` nodes.
 *
 * @public
 */
export function defineTableCommands(): TableCommandsExtension {
  return defineCommands({
    insertTable,
    exitTable: () => exitTable,

    selectTable,
    selectTableCell,
    selectTableColumn,
    selectTableRow,

    addTableColumnBefore: () => addColumnBefore,
    addTableColumnAfter: () => addColumnAfter,
    addTableRowAbove: () => addRowBefore,
    addTableRowBelow: () => addRowAfter,

    deleteTable: () => deleteTable,
    deleteTableColumn: () => deleteColumn,
    deleteTableRow: () => deleteRow,
    deleteCellSelection: () => deleteCellSelection,

    mergeTableCells: () => mergeCells,
    splitTableCell: () => splitCell,

    moveTableRow,
    moveTableColumn,
  })
}
