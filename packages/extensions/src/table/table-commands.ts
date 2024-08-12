import type { Extension } from '@prosekit/core'
import {
  defaultBlockAt,
  defineCommands,
  getNodeType,
  insertNode,
} from '@prosekit/core'
import type { ProseMirrorNode, Schema } from '@prosekit/pm/model'
import { TextSelection, type Command } from '@prosekit/pm/state'
import type { TableRole } from 'prosemirror-tables'

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

/**
 * @internal
 */
export type TableCommandsExtension = Extension<{
  Commands: {
    insertTable: [InsertTableOptions]
    exitTable: []
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
  })
}
