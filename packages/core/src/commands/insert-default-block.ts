import { TextSelection, type Command } from '@prosekit/pm/state'

import { defaultBlockAt } from '../utils/default-block-at.ts'

/**
 * @public
 */
export interface InsertDefaultBlockOptions {
  /**
   * The position to insert the node at. By default it will insert after the
   * current selection.
   */
  pos?: number
}

/**
 * Returns a command that inserts a default block after current selection or at
 * the given position.
 *
 * @public
 */
export function insertDefaultBlock(
  options?: InsertDefaultBlockOptions,
): Command {
  return (state, dispatch) => {
    const $pos = options?.pos == null
      ? state.selection.$to
      : state.doc.resolve(options.pos)
    const depth = $pos.parent.isTextblock ? $pos.depth - 1 : $pos.depth
    const parent = $pos.node(depth)
    const index = $pos.indexAfter(depth)
    const type = defaultBlockAt(parent.contentMatchAt(index))
    if (!type) return false
    if (dispatch) {
      const pos = $pos.posAtIndex(index, depth)
      const node = type.createAndFill()
      if (!node) return false
      const tr = state.tr.insert(pos, node)
      const selection = TextSelection.findFrom(tr.doc.resolve(pos), 1)
      if (!selection) return false
      tr.setSelection(selection)
      dispatch(tr.scrollIntoView())
    }
    return true
  }
}
