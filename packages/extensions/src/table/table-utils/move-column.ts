import type { Node } from '@prosekit/pm/model'
import type { Transaction } from '@prosekit/pm/state'
import {
  CellSelection,
  TableMap,
} from 'prosemirror-tables'

import { convertArrayOfRowsToTableNode } from './convert-array-of-rows-to-table-node'
import { convertTableNodeToArrayOfRows } from './convert-table-node-to-array-of-rows'
import { getSelectionRangeInColumn } from './get-selection-range-in-column'
import { moveRowInArrayOfRows } from './move-row-in-array-of-rows'
import { findTable } from './query'
import { transpose } from './transpose'

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

  const indexesOriginColumn = getSelectionRangeInColumn(tr, origin)?.indexes
  const indexesTargetColumn = getSelectionRangeInColumn(tr, target)?.indexes

  if (!indexesOriginColumn || !indexesTargetColumn) return tr

  if (indexesOriginColumn.includes(target)) return tr

  const newTable = moveTableColumn(
    table.node,
    indexesOriginColumn,
    indexesTargetColumn,
    0,
  )

  tr
    .setTime(Date.now())
    .replaceWith(
      table.pos,
      table.pos + table.node.nodeSize,
      newTable,
    )

  if (!select) return tr

  const map = TableMap.get(newTable)
  const start = table.start
  const index = target
  const lastCell = map.positionAt(map.height - 1, index, newTable)
  const $lastCell = tr.doc.resolve(start + lastCell)

  const firstCell = map.positionAt(0, index, newTable)
  const $firstCell = tr.doc.resolve(start + firstCell)

  return tr.setSelection(CellSelection.colSelection($lastCell, $firstCell))
}

function moveTableColumn(
  table: Node,
  indexesOrigin: number[],
  indexesTarget: number[],
  direction: -1 | 1 | 0,
) {
  let rows = transpose(convertTableNodeToArrayOfRows(table))

  rows = moveRowInArrayOfRows(rows, indexesOrigin, indexesTarget, direction)
  rows = transpose(rows)

  return convertArrayOfRowsToTableNode(table, rows)
}
