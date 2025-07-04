import {
  defaultBlockAt,
  defineCommands,
  getNodeType,
  insertNode,
  type Extension,
} from '@prosekit/core'
import type { Schema } from '@prosekit/pm/model'
import {
  TextSelection,
  type Command,
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
  type TableRole,
} from 'prosemirror-tables'

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

function createEmptyTable(
  schema: Schema,
  row: number,
  col: number,
  header: boolean,
) {
  const tableType = getNodeType(schema, 'table')
  const tableRowType = getNodeType(schema, 'tableRow')
  const tableCellType = getNodeType(schema, 'tableCell')
  const tableHeaderCellType = getNodeType(schema, 'tableHeaderCell')

  if (header) {
    const headerCell = tableHeaderCellType.createAndFill()!
    const headerCells = repeat(headerCell, col)
    const headerRow = tableRowType.createAndFill(null, headerCells)!

    const bodyCell = tableCellType.createAndFill()!
    const bodyCells = repeat(bodyCell, col)
    const bodyRow = tableRowType.createAndFill(null, bodyCells)!
    const bodyRows = repeat(bodyRow, row - 1)

    return tableType.createAndFill(null, [headerRow, ...bodyRows])!
  } else {
    const bodyCell = tableCellType.createAndFill()!
    const bodyCells = repeat(bodyCell, col)
    const bodyRow = tableRowType.createAndFill(null, bodyCells)!
    const bodyRows = repeat(bodyRow, row)

    return tableType.createAndFill(null, bodyRows)!
  }
}

function repeat<T>(node: T, length: number): T[] {
  return Array<T>(length).fill(node)
}

/**
 * @public
 */
export interface InsertTableOptions {
  /**
   * The number of rows in the table.
   */
  row: number

  /**
   * The number of columns in the table.
   */
  col: number

  /**
   * Whether the table has a header row.
   *
   * @default false
   */
  header?: boolean
}

/**
 * Insert a table node with the given number of rows and columns, and optionally
 * a header row.
 *
 * @param options
 *
 * @public
 */
export function insertTable(options: InsertTableOptions): Command {
  return (state, dispatch, view) => {
    const { row, col, header = false } = options
    const table = createEmptyTable(state.schema, row, col, header)
    return insertNode({ node: table })(state, dispatch, view)
  }
}

/**
 * When the selection is in a table node, create a default block after the table
 * table, and move the cursor there.
 *
 * @public
 */
export const exitTable: Command = (state, dispatch) => {
  const { $head, $anchor } = state.selection

  if (!$head.sameParent($anchor)) {
    return false
  }

  let tableStart = -1
  let tableDepth = -1
  for (let depth = $head.depth; depth >= 0; depth--) {
    const node = $head.node(depth)
    if ((node.type.spec.tableRole as TableRole) === 'table') {
      tableStart = $head.before(depth)
      tableDepth = depth
    }
  }

  if (tableStart < 0 || tableDepth <= 0) {
    return false
  }

  const above = $head.node(tableDepth - 1)
  const after = $head.indexAfter(tableDepth - 1)
  const type = defaultBlockAt(above.contentMatchAt(after))
  const node = type?.createAndFill()

  if (!type || !node || !above.canReplaceWith(after, after, type)) {
    return false
  }

  if (dispatch) {
    const pos = $head.after(tableDepth)
    const tr = state.tr.replaceWith(pos, pos, node)
    tr.setSelection(TextSelection.near(tr.doc.resolve(pos), 1))
    dispatch(tr.scrollIntoView())
  }
  return true
}

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
