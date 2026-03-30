import type { Command } from '@prosekit/pm/state'
import { CellSelection } from 'prosemirror-tables'

import { findCellRange } from '../table-utils.ts'

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
