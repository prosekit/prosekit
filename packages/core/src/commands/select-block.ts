import {
  TextSelection,
  type Command,
} from '@prosekit/pm/state'

import { isTextSelection } from '../utils/type-assertion'

// Based on https://github.com/ProseMirror/prosemirror-commands/blob/1.7.1/src/commands.ts#L507-L521
function getTextblockEndpoint(selection: TextSelection, side: number): number | undefined {
  const $pos = side < 0 ? selection.$from : selection.$to
  let depth = $pos.depth
  while ($pos.node(depth).isInline) {
    if (!depth) {
      return
    }
    depth--
  }
  if (!$pos.node(depth).isTextblock) {
    return
  }
  return side < 0 ? $pos.start(depth) : $pos.end(depth)
}

/**
 * @internal
 */
export const selectBlockCommand: Command = (state, dispatch) => {
  const { selection } = state
  if (!isTextSelection(selection)) {
    return false
  }

  // If there is only one block in the document, we don't need to select it.
  // Just return false and fall back to the default behavior, which creates an
  // `AllSelection` instance.
  if (state.doc.childCount <= 1) {
    return false
  }

  const expectedFrom = getTextblockEndpoint(selection, -1)
  const expectedTo = getTextblockEndpoint(selection, 1)
  if (expectedFrom == null || expectedTo == null) {
    return false
  }

  if (selection.from <= expectedFrom && selection.to >= expectedTo) {
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
