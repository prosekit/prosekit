import {
  TextSelection,
  type Command,
} from '@prosekit/pm/state'

import { isTextSelection } from '../utils/type-assertion'

/**
 * @internal
 */
export const selectBlockCommand: Command = (state, dispatch) => {
  const { selection } = state
  if (!isTextSelection(selection)) {
    return false
  }

  const { $from, $to } = selection
  const expectedFrom = $from.start()
  const expectedTo = $to.end()

  if ($from.pos <= expectedFrom && $to.pos >= expectedTo) {
    return false
  }

  if (dispatch) {
    const newSelection = TextSelection.create(state.doc, expectedFrom, expectedTo)
    dispatch(state.tr.setSelection(newSelection))
  }
  return true
}

/**
 * Returns a command to expand the text selection to cover the current block
 * node. If the text selection spans multiple blocks, it will select all
 * blocks in the selection.
 *
 * @public
 */
export function selectBlock(): Command {
  return selectBlockCommand
}
