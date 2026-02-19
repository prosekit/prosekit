import type { Command } from '@prosekit/pm/state'
import { CellSelection } from 'prosemirror-tables'

import { findCellPos } from '../table-utils.ts'

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
