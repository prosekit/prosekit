import type { MarkType } from '@prosekit/pm/model'
import { TextSelection, type Command } from '@prosekit/pm/state'

import { getMarkRange } from '../utils/get-mark-range.ts'

export interface ExpandMarkOptions {
  /**
   * The type of the mark to expand.
   */
  type: string | MarkType
}

/**
 * Expands the selection to include the entire mark at the current position.
 */
export function expandMark(options: ExpandMarkOptions): Command {
  return (state, dispatch) => {
    const { $from, $to, from: selectionFrom, to: selectionTo } = state.selection

    // REVIEW: use a shorter path if selectionFrom===selectionTo

    const from = getMarkRange($from, options.type)?.from ?? selectionFrom
    const to = getMarkRange($to, options.type)?.to ?? selectionTo

    if (from === selectionFrom && to === selectionTo) {
      return false
    }

    if (dispatch) {
      dispatch(state.tr.setSelection(TextSelection.create(state.doc, from, to)))
    }
    return true
  }
}
