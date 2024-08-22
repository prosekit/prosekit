import {
  defaultBlockAt,
  defineCommands,
  getNodeType,
  insertNode,
  type Extension,
} from '@prosekit/core'
import { Slice, type ProseMirrorNode, type Schema } from '@prosekit/pm/model'
import {
  TextSelection,
  type Command,
  type EditorState,
  type Transaction,
} from '@prosekit/pm/state'
import {
  addColumnAfter,
  addColumnBefore,
  addRowAfter,
  addRowBefore,
  CellSelection,
  deleteColumn,
  deleteRow,
  deleteTable,
  mergeCells,
  splitCell,
  TableMap,
  tableNodeTypes,
  type TableRole,
} from 'prosemirror-tables'

import {
  findCellPos,
  findCellRange,
  findTable,
  isCellSelection,
} from './table-utils'

function createEmptyTable(
  schema: Schema,
  row: number,
  col: number,
  header: boolean,
) {
  const table = getNodeType(schema, 'table')
  const tableRow = getNodeType(schema, 'tableRow')
  const tableCell = getNodeType(schema, 'tableCell')
  const tableHeaderCell = getNodeType(schema, 'tableHeaderCell')

  const createHeaderRow = (): ProseMirrorNode => {
    return tableRow.createAndFill(
      null,
      Array.from({ length: col }, () => tableHeaderCell.createAndFill()!),
    )!
  }

  const createBodyRow = (): ProseMirrorNode => {
    return tableRow.createAndFill(
      null,
      Array.from({ length: col }, () => tableCell.createAndFill()!),
    )!
  }

  const rows = [
    ...Array.from({ length: header ? 1 : 0 }, createHeaderRow),
    ...Array.from({ length: header ? row - 1 : row }, createBodyRow),
  ]
  return table.createAndFill(null, rows)!
}

/**
 * @public
 */
export interface InsertTableOptions {
  row: number
  col: number
  header: boolean
}

/**
 * Insert a table node with the given number of rows and columns, and optionally
 * a header row.
 *
 * @param options
 *
 * @public
 */
export function insertTable({ row, col, header }: InsertTableOptions): Command {
  return (state, dispatch, view) => {
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

// TODO: Just export the deleteCellSelection function from prosemirror-tables

/**
 * Remove the content in the selected table cells.
 *
 * @public
 */
export function deleteCellSelection(
  state: EditorState,
  dispatch?: (tr: Transaction) => void,
): boolean {
  const sel = state.selection
  if (!isCellSelection(sel)) return false
  if (dispatch) {
    const tr = state.tr
    const baseCell = tableNodeTypes(state.schema).cell.createAndFill()
    if (!baseCell) {
      return false
    }
    const baseContent = baseCell.content
    sel.forEachCell((cell, pos) => {
      if (!cell.content.eq(baseContent))
        tr.replace(
          tr.mapping.map(pos + 1),
          tr.mapping.map(pos + cell.nodeSize - 1),
          new Slice(baseContent, 0, 0),
        )
    })
    if (tr.docChanged) dispatch(tr)
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
      const firstCellPosInTable = map.map[0]!
      const lastCellPosInTable = map.map[map.map.length - 1]!
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
    insertTable: [InsertTableOptions]
    exitTable: []
    deleteCellSelection: []
    mergeTableCells: []
    splitTableCell: []
    selectTableColumn: [options?: SelectTableColumnOptions]
    selectTableRow: [options?: SelectTableRowOptions]
    selectTableCell: [options?: SelectTableCellOptions]
    selectTable: [options?: SelectTableOptions]
    deleteTableColumn: []
    addTableColumnBefore: []
    addTableColumnAfter: []
    addTableRowAbove: []
    addTableRowBelow: []
    deleteTableRow: []
    deleteTable: []
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
    deleteCellSelection: () => deleteCellSelection,
    mergeTableCells: () => mergeCells,
    splitTableCell: () => splitCell,
    selectTableColumn,
    selectTableRow,
    selectTableCell,
    selectTable,
    deleteTableColumn: () => deleteColumn,
    addTableColumnBefore: () => addColumnBefore,
    addTableColumnAfter: () => addColumnAfter,
    addTableRowAbove: () => addRowBefore,
    addTableRowBelow: () => addRowAfter,
    deleteTableRow: () => deleteRow,
    deleteTable: () => deleteTable,
  })
}
