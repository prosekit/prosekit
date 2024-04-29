import type { Attrs, Mark, MarkType } from '@prosekit/pm/model'
import type { EditorState } from '@prosekit/pm/state'

import { getMarkType } from './get-mark-type'
import { isMarkAbsent } from './is-mark-absent'

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
  const mark: Mark | MarkType = attrs ? markType.create(attrs) : markType
  if (empty) {
    return !!mark.isInSet(state.storedMarks || $from.marks())
  } else {
    return !isMarkAbsent(state.doc, from, to, markType, attrs)
  }
}
