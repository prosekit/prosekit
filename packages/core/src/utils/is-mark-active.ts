import type { Attrs, MarkType } from '@prosekit/pm/model'
import type { EditorState } from '@prosekit/pm/state'

import { getMarkType } from './get-mark-type'

export function isMarkActive(
  state: EditorState,
  type: string | MarkType,
  attrs?: Attrs | null,
): boolean {
  const markType = getMarkType(state.schema, type)
  const mark = attrs ? markType.create(attrs) : markType
  const { from, to } = state.selection
  return state.doc.rangeHasMark(from, to, mark)
}
