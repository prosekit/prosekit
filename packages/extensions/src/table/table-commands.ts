import { defineCommands, type Extension } from '@prosekit/core'
import {
  addColumnAfter as addTableColumnAfter,
  addColumnBefore as addTableColumnBefore,
  addRowAfter as addTableRowBelow,
  addRowBefore as addTableRowAbove,
  deleteColumn as deleteTableColumn,
  deleteRow as deleteTableRow,
  deleteTable,
  mergeCells as mergeTableCells,
  splitCell as splitTableCell,
} from 'prosemirror-tables'

import { deleteCellSelection } from './table-commands/delete-cell-selection.ts'
import { exitTable } from './table-commands/exit-table.ts'
import { insertTable, type InsertTableOptions } from './table-commands/insert-table.ts'
import { moveTableColumn, type MoveTableColumnOptions } from './table-commands/move-table-column.ts'
import { moveTableRow, type MoveTableRowOptions } from './table-commands/move-table-row.ts'
import { selectTableCell, type SelectTableCellOptions } from './table-commands/select-table-cell.ts'
import { selectTableColumn, type SelectTableColumnOptions } from './table-commands/select-table-column.ts'
import { selectTableRow, type SelectTableRowOptions } from './table-commands/select-table-row.ts'
import { selectTable, type SelectTableOptions } from './table-commands/select-table.ts'

export {
  addTableColumnAfter,
  addTableColumnBefore,
  addTableRowAbove,
  addTableRowBelow,
  deleteTable,
  deleteTableColumn,
  deleteTableRow,
  mergeTableCells,
  splitTableCell,
}

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
 */
export function defineTableCommands(): TableCommandsExtension {
  return defineCommands({
    insertTable,
    exitTable: () => exitTable,

    selectTable,
    selectTableCell,
    selectTableColumn,
    selectTableRow,

    addTableColumnBefore: () => addTableColumnBefore,
    addTableColumnAfter: () => addTableColumnAfter,
    addTableRowAbove: () => addTableRowAbove,
    addTableRowBelow: () => addTableRowBelow,

    deleteTable: () => deleteTable,
    deleteTableColumn: () => deleteTableColumn,
    deleteTableRow: () => deleteTableRow,
    deleteCellSelection: () => deleteCellSelection,

    mergeTableCells: () => mergeTableCells,
    splitTableCell: () => splitTableCell,

    moveTableRow,
    moveTableColumn,
  })
}
