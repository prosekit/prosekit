import type { Node } from '@prosekit/pm/model';
import { TableMap } from 'prosemirror-tables';

/**
 * Convert an array of rows to a table node.
 * 
 * @internal
 */
export function convertArrayOfRowsToTableNode(
    tableNode: Node,
    arrayOfNodes: (Node | null)[][]
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
            cell.marks
        )
        rowCells.push(newCell)
        }

        rowsPM.push(row.type.createChecked(row.attrs, rowCells, row.marks))
    }

    const newTable = tableNode.type.createChecked(
        tableNode.attrs,
        rowsPM,
        tableNode.marks
    )

    return newTable
}

/**
 * Convert a table node to an array of rows.
 * 
 * @internal
 */
export function convertTableNodeToArrayOfRows(tableNode: Node): (Node | null)[][] {
    const map = TableMap.get(tableNode)
    const rows: (Node | null)[][] = []
    for (let rowIndex = 0; rowIndex < map.height; rowIndex++) {
      const rowCells: (Node | null)[] = []
      const seen: Record<number, boolean> = {}
  
      for (let colIndex = 0; colIndex < map.width; colIndex++) {
        const cellPos = map.map[rowIndex * map.width + colIndex]
        const cell = tableNode.nodeAt(cellPos)
        const rect = map.findCell(cellPos)
        if (seen[cellPos] || rect.top !== rowIndex) {
          rowCells.push(null)
          continue
        }
        seen[cellPos] = true
  
        rowCells.push(cell)
      }
  
      rows.push(rowCells)
    }
  
    return rows
  }

/**
 * Move a row in an array of rows.
 * 
 * @internal
 */
export function moveRowInArrayOfRows(
    rows: (Node | null)[][],
    indexesOrigin: number[],
    indexesTarget: number[],
    directionOverride: -1 | 1 | 0
): (Node | null)[][] {
  const direction = indexesOrigin[0] > indexesTarget[0] ? -1 : 1

  const rowsExtracted = rows.splice(indexesOrigin[0], indexesOrigin.length)
  const positionOffset = rowsExtracted.length % 2 === 0 ? 1 : 0
  let target: number

  if (directionOverride === -1 && direction === 1) {
    target = indexesTarget[0] - 1
  } else if (directionOverride === 1 && direction === -1) {
    target = indexesTarget[indexesTarget.length - 1] - positionOffset + 1
  } else {
    target =
      direction === -1
        ? indexesTarget[0]
        : indexesTarget[indexesTarget.length - 1] - positionOffset
  }

  rows.splice(target, 0, ...rowsExtracted)
  return rows
}