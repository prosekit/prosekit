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
    const { $from, $to, empty, from: selectionFrom, to: selectionTo } = state.selection

    // A collapsed selection shares one position, so one lookup covers both ends.
    const fromRange = getMarkRange($from, options.type)
    const toRange = empty ? fromRange : getMarkRange($to, options.type)
    const from = fromRange?.from ?? selectionFrom
    const to = toRange?.to ?? selectionTo

    if (from === selectionFrom && to === selectionTo) {
      return false
    }

    if (dispatch) {
      dispatch(state.tr.setSelection(TextSelection.create(state.doc, from, to)))
    }
    return true
  }
}
