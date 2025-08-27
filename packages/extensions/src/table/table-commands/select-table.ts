import type { Command } from '@prosekit/pm/state'
import {
  CellSelection,
  TableMap,
} from 'prosemirror-tables'

import { findTable } from '../table-utils'

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