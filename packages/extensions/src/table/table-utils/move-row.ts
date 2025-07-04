import type { Node } from '@prosekit/pm/model'
import type { Transaction } from '@prosekit/pm/state'
import {
  CellSelection,
  TableMap,
} from 'prosemirror-tables'

import { convertArrayOfRowsToTableNode } from './convert-array-of-rows-to-table-node'
import { convertTableNodeToArrayOfRows } from './convert-table-node-to-array-of-rows'
import { moveRowInArrayOfRows } from './move-row-in-array-of-rows'
import { getSelectionRangeInRow } from './get-selection-range-in-row'
import { findTable } from './query'

export interface MoveRowParams {
  tr: Transaction
  origin: number
  target: number
  select?: boolean
  pos?: number
}

/**
 * Move a row from index `origin` to index `target`.
 *
 * @internal
 */
export function moveRow(moveRowParams: MoveRowParams): Transaction {
  const { tr, origin, target, select = true, pos } = moveRowParams
  const $pos = pos != null ? tr.doc.resolve(pos) : tr.selection.$from
  const table = findTable($pos)
  if (!table) return tr

  const indexesOriginRow = getSelectionRangeInRow(tr, origin)?.indexes
  const indexesTargetRow = getSelectionRangeInRow(tr, target)?.indexes

  if (!indexesOriginRow || !indexesTargetRow) return tr

  if (indexesOriginRow.includes(target)) return tr

  const newTable = moveTableRow(table.node, indexesOriginRow, indexesTargetRow, 0)

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
  const lastCell = map.positionAt(index, map.width - 1, newTable)
  const $lastCell = tr.doc.resolve(start + lastCell)

  const firstCell = map.positionAt(index, 0, newTable)
  const $firstCell = tr.doc.resolve(start + firstCell)

  return tr.setSelection(CellSelection.rowSelection($lastCell, $firstCell))
}

function moveTableRow(
  table: Node,
  indexesOrigin: number[],
  indexesTarget: number[],
  direction: -1 | 1 | 0,
) {
  let rows = convertTableNodeToArrayOfRows(table)

  rows = moveRowInArrayOfRows(rows, indexesOrigin, indexesTarget, direction)

  return convertArrayOfRowsToTableNode(table, rows)
}
