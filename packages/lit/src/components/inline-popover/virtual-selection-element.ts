import type { ReferenceElement } from '@floating-ui/dom'
import { isNodeSelection, isTextSelection } from '@prosekit/core'
import type { EditorView } from '@prosekit/pm/view'

import { isInCodeBlock } from '../../utils/is-in-code-block'

export function getVirtualSelectionElement(
  view: EditorView,
): ReferenceElement | undefined {
  if (typeof window === 'undefined' || view.isDestroyed) {
    return
  }

  const selection = view.state.selection

  if (
    !selection.empty &&
    !isInCodeBlock(selection) &&
    (isTextSelection(selection) || isNodeSelection(selection))
  ) {
    const decoration = getInlineDecoration(view)
    if (decoration) {
      return decoration
    }

    const range = getDomRange()
    if (range) {
      // To get it work properly in Safari, we cannot return the range directly.
      // We have to return a contextElement.
      return {
        contextElement: view.dom,
        getBoundingClientRect: () => range.getBoundingClientRect(),
        getClientRects: () => range.getClientRects(),
      }
    }
  }
}

function getDomRange() {
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

function getInlineDecoration(view: EditorView) {
  const match = view.dom.querySelectorAll('.prosekit-virtual-selection')

  if (match.length === 0) {
    return
  }
  if (match.length === 1) {
    return match[0]
  }

  const items = Array.from(match)
  return {
    contextElement: items[0],
    getBoundingClientRect: () => items[0].getBoundingClientRect(),
    getClientRects: () => items.map((item) => item.getBoundingClientRect()),
  }
}
