import { TextSelection, type EditorState } from '@prosekit/pm/state'

export function getCustomSelection(
  state: EditorState,
  from?: number | null,
  to?: number | null,
) {
  const pos = from ?? to
  if (pos != null) {
    const $from = state.doc.resolve(from ?? pos)
    const $to = state.doc.resolve(to ?? pos)
    return TextSelection.between($from, $to)
  }
  return state.selection
}
