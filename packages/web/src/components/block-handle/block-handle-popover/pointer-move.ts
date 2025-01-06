import type {
  ClientRectObject,
  VirtualElement,
} from '@floating-ui/dom'
import {
  defineDOMEventHandler,
  union,
} from '@prosekit/core'
import type { ProseMirrorNode } from '@prosekit/pm/model'
import type { EditorView } from '@prosekit/pm/view'

import { throttle } from '../../../utils/throttle'
import type { HoverState } from '../context'

export type ElementHoverHandler = (
  reference: VirtualElement | null,
  hoverState: HoverState | null,
) => void

export function defineElementHoverHandler(handler: ElementHoverHandler) {
  const handleElement = (element: HTMLElement | null, node: ProseMirrorNode | null, pos: number) => {
    if (!element || !node) {
      handler(null, null)
      return
    }

    const reference: VirtualElement = {
      contextElement: element,

      // Create a virtual element that represents the first line of the tex
      getBoundingClientRect: () => {
        return getFirstLineRect(element) || fallbackRect
      },
    }

    handler(reference, { element, node, pos })
  }

  const handlePointerEvent = (view: EditorView, event: PointerEvent) => {
    const rect = view.dom.getBoundingClientRect()
    const pos = view.posAtCoords({
      top: event.clientY,
      // Use the center of the editor
      left: rect.left + rect.width / 2,
    })?.inside

    if (pos == null || pos < 0) {
      handler(null, null)
      return
    }

    const $pos = view.state.doc.resolve(pos)
    const node = view.state.doc.nodeAt(pos)
    const element = view.nodeDOM(pos) as HTMLElement | null

    // If current node is the first child of its parent node, we want to position the popover
    // relative to the parent node instead of the current node.
    if ($pos.depth >= 1 && $pos.index($pos.depth) === 0) {
      const ancestorPos = $pos.before($pos.depth)
      const node = view.state.doc.nodeAt(ancestorPos)
      const element = view.nodeDOM(ancestorPos) as HTMLElement | null

      handleElement(element, node, ancestorPos)
      return
    }

    handleElement(element, node, pos)
  }

  return union(
    defineDOMEventHandler('pointermove', throttle(handlePointerEvent, 200)),
    defineDOMEventHandler('pointerout', handlePointerEvent),
    defineDOMEventHandler('keypress', () => handler(null, null)),
  )
}

function calc(view: EditorView, doc: ProseMirrorNode, pos: number) {
  let innerElement: HTMLElement | null | undefined
  let innerNode: ProseMirrorNode | null | undefined
  let outerElement: HTMLElement | null | undefined
  let outerNode: ProseMirrorNode | null | undefined
  let outerPos: number | undefined

  const $pos = doc.resolve(pos)

  // If current node is the first child of its parent node, we want to position the popover
  // relative to the parent node instead of the current node.
  if ($pos.depth >= 1 && $pos.index($pos.depth) === 0) {
    const ancestorPos = $pos.before($pos.depth)
    const node = doc.nodeAt(ancestorPos)
    const element = view.nodeDOM(ancestorPos) as HTMLElement | null

    handleElement(element, node, ancestorPos)
    return
  }
}

/**
 * Calculates the bounding rectangle that represents the first line of text
 * within an element.
 *
 * Notice that the element might not contain any text, for example, when it is
 * an `<img>` element.
 */
function getFirstLineRect(element: Element): ClientRectObject | undefined {
  const style = window.getComputedStyle(element)

  // If `display` is `contents`, the rect is empty. We need to calculate the rect of the children.
  if (style.display === 'contents') {
    for (const child of element.children) {
      const rect = getFirstLineRect(child)
      if (rect) {
        return rect
      }
    }
    return
  }

  const rect = element.getBoundingClientRect()

  const lineHeight = Number.parseInt(style.lineHeight, 10) || 24
  const paddingTop = Number.parseInt(style.paddingTop, 10) || 0
  const borderTop = Number.parseInt(style.borderTopWidth, 10) || 0
  const marginLeft = Number.parseInt(style.marginLeft, 10) || 0
  const marginRight = Number.parseInt(style.marginRight, 10) || 0

  const top = rect.top + paddingTop + borderTop
  const height = lineHeight
  const bottom = top + height

  // The list node has a margin-left, so we need to consider it too.
  const left = rect.left - marginLeft
  const right = rect.right + marginRight
  const width = right - left

  return { top, right, bottom, left, width, height, x: left, y: top }
}

// A fallback rect that is far away from the screen. It should not be used through.
const fallbackRect = Object.freeze({
  top: -1000,
  right: -1000,
  bottom: -1000,
  left: -1000,
  width: 0,
  height: 0,
  x: -1000,
  y: -1000,
})
