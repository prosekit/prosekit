import {
  defineKeymap,
  Priority,
  withPriority,
  type PlainExtension,
} from '@prosekit/core'
import {
  AllSelection,
  type Command,
} from '@prosekit/pm/state'

import {
  isBlockSelected,
  selectCurrentBlock,
} from './select-block-utils'

/**
 * Ctrl-A command: first press selects current block, if block is already selected then select all
 */
const selectAllOrBlockCommand: Command = (state, dispatch) => {
  const { selection } = state

  // If already selected all, do nothing
  if (selection instanceof AllSelection) {
    return true
  }

  // If current block is already selected (but not all), then select all
  if (isBlockSelected(selection)) {
    if (dispatch) {
      dispatch(state.tr.setSelection(new AllSelection(state.doc)))
    }
    return true
  }

  // Otherwise select current block
  return selectCurrentBlock(state, dispatch)
}

export function defineSelectBlockKeymap(): PlainExtension {
  return withPriority(
    defineKeymap({
      'Mod-a': selectAllOrBlockCommand,
    }),
    Priority.highest,
  )
}
