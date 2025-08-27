import {
  getNodeType,
  insertNode,
} from '@prosekit/core'
import type { Schema } from '@prosekit/pm/model'
import type { Command } from '@prosekit/pm/state'

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