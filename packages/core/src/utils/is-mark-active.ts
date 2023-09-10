import type { Attrs, Mark, MarkType } from '@prosekit/pm/model'
import type { EditorState } from '@prosekit/pm/state'

import { getMarkType } from './get-mark-type'
import { isMark } from './type-assertion'

export function isMarkActive(
  state: EditorState,
  type: string | MarkType,
  attrs?: Attrs | null,
): boolean {
  const markType = getMarkType(state.schema, type)
  const mark = attrs ? markType.create(attrs) : markType
  const { from, to, $from, $to } = state.selection

  return (
    state.doc.rangeHasMark(from, to, mark) ||
    hasMark(
      [...$from.marks(), ...$to.marks(), ...(state.storedMarks ?? [])],
      mark,
    )
  )
}

function hasMark(marks: readonly Mark[], mark: Mark | MarkType): boolean {
  if (marks.length === 0) {
    return false
  }

  if (isMark(mark)) {
    return marks.some((m) => m.eq(mark))
  } else {
    return marks.some((m) => m.type === mark)
  }
}
