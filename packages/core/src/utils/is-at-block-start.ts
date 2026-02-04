import type { ResolvedPos } from '@prosekit/pm/model'
import type { EditorState, TextSelection } from '@prosekit/pm/state'
import type { EditorView } from '@prosekit/pm/view'

/**
 * Whether the selection is an empty text selection at the start of a block.
 *
 * @internal
 */
export function isAtBlockStart(
  state: EditorState,
  view?: EditorView,
): ResolvedPos | null {
  // Copy from https://github.com/ProseMirror/prosemirror-commands/blob/1.5.2/src/commands.ts#L15
  const { $cursor } = state.selection as TextSelection
  if (
    !$cursor
    || (view ? !view.endOfTextblock('backward', state) : $cursor.parentOffset > 0)
  ) {
    return null
  }
  return $cursor
}
