import type { Mark, MarkType, ResolvedPos } from '@prosekit/pm/model'
import { TextSelection, type Command } from '@prosekit/pm/state'

import { getMarkType } from '../utils/get-mark-type.ts'

/**
 * @public
 */
export interface ExpandMarkOptions {
  /**
   * The type of the mark to expand.
   */
  type: string | MarkType
}

/**
 * Expands the selection to include the entire mark at the current position.
 *
 * @public
 */
export function expandMark(options: ExpandMarkOptions): Command {
  return (state, dispatch) => {
    const markType = getMarkType(state.schema, options.type)
    const predicate = (mark: Mark) => mark.type === markType

    const from = expandMarkBefore(state.selection.$from, predicate)
    const to = expandMarkAfter(state.selection.$to, predicate)

    if (from === state.selection.from && to === state.selection.to) {
      return false
    }

    if (dispatch) {
      dispatch(state.tr.setSelection(TextSelection.create(state.doc, from, to)))
    }
    return true
  }
}

function expandMarkBefore(
  $pos: ResolvedPos,
  predicate: (mark: Mark) => boolean,
): number {
  const { parent } = $pos

  if (!$pos.marks().some(predicate)) {
    return $pos.pos
  }

  const index = $pos.index()
  let boundaryIndex = index

  for (let i = index; i >= 0; i--) {
    const node = parent.child(i)
    if (node.marks.some(predicate)) {
      boundaryIndex = i
    } else {
      break
    }
  }

  return $pos.posAtIndex(boundaryIndex)
}

function expandMarkAfter(
  $pos: ResolvedPos,
  predicate: (mark: Mark) => boolean,
): number {
  const { parent } = $pos

  if (!$pos.marks().some(predicate)) {
    return $pos.pos
  }

  const index = Math.max(0, $pos.indexAfter() - 1)
  const childCount = parent.childCount
  let boundaryIndex = index

  for (let i = index; i < childCount; i++) {
    const node = parent.child(i)
    if (node.marks.some(predicate)) {
      boundaryIndex = i
    } else {
      break
    }
  }

  return $pos.posAtIndex(boundaryIndex) + parent.child(boundaryIndex).nodeSize
}
