import { isTextSelection } from '@prosekit/core'
import type { EditorView } from '@prosekit/pm/view'

export function getVirtualSelectionElement(view: EditorView) {
  if (
    typeof window === 'undefined' ||
    view.isDestroyed ||
    view.state.selection.empty ||
    !isTextSelection(view.state.selection)
  ) {
    return
  }

  const selection = window.getSelection()
  if (!selection || selection.isCollapsed) {
    return
  }

  const range =
    typeof selection.rangeCount === 'number' &&
    selection.rangeCount > 0 &&
    selection.getRangeAt(0)

  if (!range) {
    return
  }

  return range
}
