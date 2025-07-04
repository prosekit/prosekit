import type { Node } from '@prosekit/pm/model'
import { TableMap } from 'prosemirror-tables'

/**
 * Convert an array of rows to a table node.
 *
 * @internal
 */
export function convertArrayOfRowsToTableNode(
  tableNode: Node,
  arrayOfNodes: (Node | null)[][],
): Node {
  const rowsPM = []
  const map = TableMap.get(tableNode)
  for (let rowIndex = 0; rowIndex < map.height; rowIndex++) {
    const row = tableNode.child(rowIndex)
    const rowCells = []

    for (let colIndex = 0; colIndex < map.width; colIndex++) {
      if (!arrayOfNodes[rowIndex][colIndex]) continue

      const cellPos = map.map[rowIndex * map.width + colIndex]

      const cell = arrayOfNodes[rowIndex][colIndex]!
      const oldCell = tableNode.nodeAt(cellPos)!
      const newCell = oldCell.type.createChecked(
        Object.assign({}, cell.attrs),
        cell.content,
        cell.marks,
      )
      rowCells.push(newCell)
    }

    rowsPM.push(row.type.createChecked(row.attrs, rowCells, row.marks))
  }

  const newTable = tableNode.type.createChecked(
    tableNode.attrs,
    rowsPM,
    tableNode.marks,
  )

  return newTable
}

/**
 * This function will transform the table node into a matrix of rows and columns
 * respecting merged cells, for example this table:
 *
 * ```
 * ┌──────┬──────┬─────────────┐
 * │  A1  │  B1  │     C1      │
 * ├──────┼──────┴──────┬──────┤
 * │  A2  │     B2      │      │
 * ├──────┼─────────────┤  D1  │
 * │  A3  │  B3  │  C3  │      │
 * └──────┴──────┴──────┴──────┘
 * ```
 *
 * will be converted to the below:
 *
 * ```javascript
 * [
 *   [A1, B1, C1, null],
 *   [A2, B2, null, D1],
 *   [A3, B3, C3, null],
 * ]
 * ```
 * @internal
 */
export function convertTableNodeToArrayOfRows(tableNode: Node): (Node | null)[][] {
  const map = TableMap.get(tableNode)
  const rows: (Node | null)[][] = []
  const rowCount = map.height
  const colCount = map.width
  for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    const row: (Node | null)[] = []
    for (let colIndex = 0; colIndex < colCount; colIndex++) {
      let cellIndex = rowIndex * colCount + colIndex
      let cellPos = map.map[cellIndex]
      if (rowIndex > 0) {
        const topCellIndex = cellIndex - colCount
        const topCellPos = map.map[topCellIndex]
        if (cellPos === topCellPos) {
          row.push(null)
          continue
        }
      }
      if (colIndex > 0) {
        const leftCellIndex = cellIndex - 1
        const leftCellPos = map.map[leftCellIndex]
        if (cellPos === leftCellPos) {
          row.push(null)
          continue
        }
      }
      row.push(tableNode.nodeAt(cellPos))
    }
    rows.push(row)
  }

  return rows
}

/**
 * Move a row in an array of rows.
 *
 * @internal
 */
export function moveRowInArrayOfRows<T>(
  rows: T[][],
  indexesOrigin: number[],
  indexesTarget: number[],
  directionOverride: -1 | 1 | 0,
): T[][] {
  const direction = indexesOrigin[0] > indexesTarget[0] ? -1 : 1

  const rowsExtracted = rows.splice(indexesOrigin[0], indexesOrigin.length)
  const positionOffset = rowsExtracted.length % 2 === 0 ? 1 : 0
  let target: number

  if (directionOverride === -1 && direction === 1) {
    target = indexesTarget[0] - 1
  } else if (directionOverride === 1 && direction === -1) {
    target = indexesTarget[indexesTarget.length - 1] - positionOffset + 1
  } else {
    target = direction === -1
      ? indexesTarget[0]
      : indexesTarget[indexesTarget.length - 1] - positionOffset
  }

  rows.splice(target, 0, ...rowsExtracted)
  return rows
}
