import type { Attrs, MarkType } from '@prosekit/pm/model'
import type { EditorState } from '@prosekit/pm/state'

import { getMarkType } from './get-mark-type'

/**
 * @internal
 */
export function isMarkActive(
  state: EditorState,
  type: string | MarkType,
  attrs?: Attrs | null,
): boolean {
  const { from, $from, to, empty } = state.selection
  const markType = getMarkType(state.schema, type)
  if (empty) {
    const mark = attrs ? markType.create(attrs) : markType
    return !!mark.isInSet(state.storedMarks || $from.marks())
  } else {
    const markOrType = attrs ? markType.create(attrs) : markType
    return state.doc.rangeHasMark(from, to, markOrType)
  }
}
