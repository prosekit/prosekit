import type { ReferenceElement } from '@floating-ui/dom'
import { isTextSelection } from '@prosekit/core'
import type { TextSelection } from '@prosekit/pm/state'
import type { EditorView } from '@prosekit/pm/view'

import { isInCodeBlock } from '../../../utils/is-in-code-block'

export function getVirtualSelectionElement(
  view: EditorView,
): ReferenceElement | null {
  if (typeof window === 'undefined' || view.isDestroyed) {
    return null
  }

  const selection = view.state.selection

  if (
    !selection.empty &&
    !isInCodeBlock(selection) &&
    isTextSelection(selection) &&
    containsInlineNode(selection)
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

  return null
}

function containsInlineNode(selection: TextSelection) {
  const doc = selection.$anchor.doc
  const { from, to } = selection
  let found = false
  doc.nodesBetween(from, to, (node) => {
    if (found) return false
    if (node.isInline) found = true
  })
  return found
}

function getDomRange(): Range | undefined {
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

function getInlineDecoration(view: EditorView): ReferenceElement | undefined {
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
