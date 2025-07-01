import type { Node } from '@prosekit/pm/model';
import type { Transaction } from "@prosekit/pm/state"
import { CellSelection, TableMap } from "prosemirror-tables"

import { convertArrayOfRowsToTableNode, convertTableNodeToArrayOfRows, moveRowInArrayOfRows } from './convert-row-and-table';
import { getSelectionRangeInColumn } from "./get-selection-range-in-column"
import { findTable } from "./query"

export interface MoveColumnParams {
    tr: Transaction
    origin: number
    target: number
    select?: boolean
    pos?: number
  }
  
/**
 * Move a column from index `origin` to index `target`.
 * 
 * @internal
 */
export function moveColumn(moveColParams: MoveColumnParams): Transaction {
    const { tr, origin, target, select = true, pos } = moveColParams
    const $pos = pos != null ? tr.doc.resolve(pos) : tr.selection.$from
    const table = findTable($pos)
    if (!table) return tr

    const indexesOriginColumn = getSelectionRangeInColumn(origin)(tr)?.indexes
    const indexesTargetColumn = getSelectionRangeInColumn(target)(tr)?.indexes

    if (!indexesOriginColumn || !indexesTargetColumn) return tr

    if (indexesOriginColumn.includes(target)) return tr

    const newTable = moveTableColumn(
        table.node,
        indexesOriginColumn,
        indexesTargetColumn,
        0
    )

    const _tr = tr
        .setTime(Date.now())
        .replaceWith(
            table.pos,
            table.pos + table.node.nodeSize,
            newTable
        )

    if (!select) return _tr

    const map = TableMap.get(newTable)
    const start = table.start
    const index = target
    const lastCell = map.positionAt(map.height - 1, index, newTable)
    const $lastCell = _tr.doc.resolve(start + lastCell)

    const firstCell = map.positionAt(0, index, newTable)
    const $firstCell = _tr.doc.resolve(start + firstCell)

    return _tr.setSelection(CellSelection.colSelection($lastCell, $firstCell))
}

function moveTableColumn(
    table: Node,
    indexesOrigin: number[],
    indexesTarget: number[],
    direction: -1 | 1 | 0
  ) {
    let rows = transpose(convertTableNodeToArrayOfRows(table))
  
    rows = moveRowInArrayOfRows(rows, indexesOrigin, indexesTarget, direction)
    rows = transpose(rows)
  
    return convertArrayOfRowsToTableNode(table, rows)
  }

  function transpose<T>(array: T[][]) {
    return array[0].map((_, i) => {
      return array.map((column) => column[i])
    })
  }