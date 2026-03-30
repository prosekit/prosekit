import type { Attrs, MarkType } from '@prosekit/pm/model'
import type { EditorState } from '@prosekit/pm/state'

import { getMarkType } from './get-mark-type.ts'
import { includesMark } from './includes-mark.ts'
import { isMarkAbsent } from './is-mark-absent.ts'

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
    const marks = state.storedMarks || $from.marks()
    return includesMark(marks, markType, attrs)
  } else {
    return !isMarkAbsent(state.doc, from, to, markType, attrs)
  }
}
