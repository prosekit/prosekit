import {
  defineCommands,
  type Extension,
} from '@prosekit/core'
import type {
  Command,
} from '@prosekit/pm/state'
import {
  addColumnAfter,
  addColumnBefore,
  addRowAfter,
  addRowBefore,
  CellSelection,
  deleteCellSelection,
  deleteColumn,
  deleteRow,
  deleteTable,
  mergeCells,
  splitCell,
  TableMap,
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
  findCellPos,
  findCellRange,
  findTable,
} from './table-utils'



/**
 * @public
 */
export interface SelectTableColumnOptions {
  /**
   * A hit position of the table cell to select from. By default, the selection
   * anchor will be used.
   */
  anchor?: number

  /**
   * A hit position of the table cell to select to. By default, the selection
   * head will be used.
   */
  head?: number
}

/**
 * @public
 */
export function selectTableColumn(options?: SelectTableColumnOptions): Command {
  return (state, dispatch) => {
    const range = findCellRange(state.selection, options?.anchor, options?.head)
    if (!range) {
      return false
    }
    if (dispatch) {
      const [$anchorCell, $headCell] = range
      const selection = CellSelection.colSelection($anchorCell, $headCell)
      dispatch(state.tr.setSelection(selection))
    }
    return true
  }
}

/**
 * @public
 */
export interface SelectTableRowOptions {
  /**
   * A hit position of the table cell to select from. By default, the selection
   * anchor will be used.
   */
  anchor?: number

  /**
   * A hit position of the table cell to select to. By default, the selection
   * head will be used.
   */
  head?: number
}

/**
 * @public
 */
export function selectTableRow(options?: SelectTableRowOptions): Command {
  return (state, dispatch) => {
    const range = findCellRange(state.selection, options?.anchor, options?.head)
    if (!range) {
      return false
    }
    if (dispatch) {
      const [$anchorCell, $headCell] = range
      const selection = CellSelection.rowSelection($anchorCell, $headCell)
      dispatch(state.tr.setSelection(selection))
    }
    return true
  }
}

/**
 * @public
 */
export interface SelectTableCellOptions {
  /**
   * A hit position of the table cell to select from. By default, the selection
   * anchor will be used.
   */
  pos?: number
}

/**
 * @public
 */
export function selectTableCell(options?: SelectTableCellOptions): Command {
  return (state, dispatch) => {
    const $cellPos = findCellPos(
      state.doc,
      options?.pos ?? state.selection.anchor,
    )
    if (!$cellPos) {
      return false
    }
    if (dispatch) {
      const selection = new CellSelection($cellPos)
      dispatch(state.tr.setSelection(selection))
    }
    return true
  }
}

/**
 * @public
 */
export interface SelectTableOptions {
  /**
   * A hit position of the table to select from. By default, the selection
   * anchor will be used.
   */
  pos?: number
}

/**
 * @public
 */
export function selectTable(options?: SelectTableOptions): Command {
  return (state, dispatch) => {
    const $pos = options?.pos
      ? state.doc.resolve(options.pos)
      : state.selection.$anchor
    const table = findTable($pos)
    if (!table) {
      return false
    }
    const map = TableMap.get(table.node)
    if (map.map.length === 0) {
      return false
    }
    if (dispatch) {
      let tr = state.tr
      const firstCellPosInTable = map.map[0]
      const lastCellPosInTable = map.map[map.map.length - 1]
      const firstCellPos = table.pos + firstCellPosInTable + 1
      const lastCellPos = table.pos + lastCellPosInTable + 1
      const $firstCellPos = tr.doc.resolve(firstCellPos)
      const $lastCellPos = tr.doc.resolve(lastCellPos)
      const selection = new CellSelection($firstCellPos, $lastCellPos)
      tr = tr.setSelection(selection)
      dispatch?.(tr)
    }
    return true
  }
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
