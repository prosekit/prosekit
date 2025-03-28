import type { VirtualElement } from '@floating-ui/dom'
import {
  isElement,
  isHTMLElement,
  isTextNode,
} from '@ocavue/utils'
import {
  defineDOMEventHandler,
  union,
} from '@prosekit/core'
import type { ProseMirrorNode } from '@prosekit/pm/model'
import type { EditorView } from '@prosekit/pm/view'

import { getClientRect } from '../../../utils/get-client-rect'
import { throttle } from '../../../utils/throttle'
import type { HoverState } from '../context'

export type ElementHoverHandler = (
  reference: VirtualElement | null,
  hoverState: HoverState | null,
) => void

export function defineElementHoverHandler(handler: ElementHoverHandler) {
  const handleElement = (
    node: ProseMirrorNode,
    pos: number,
    element: HTMLElement,
    parentElement?: Node | null,
  ) => {
    const reference: VirtualElement = {
      contextElement: element,

      getBoundingClientRect: () => {
        const rect = findFirstLineRect(parentElement, element)
        return rect ? fulfillRect(rect) : fallbackRect
      },
    }

    handler(reference, { node, pos })
  }

  const handlePointerEvent = (view: EditorView, event: PointerEvent) => {
    const { x, y } = event
    const block = findBlockByCoordinate(view, x, y)
    if (!block) {
      handler(null, null)
      return
    }

    const { node, pos } = block
    const element = view.nodeDOM(pos)
    if (!element || !isHTMLElement(element)) {
      handler(null, null)
      return
    }

    // If `node` is the first child of another non-doc block node, for example a
    // list node or a blockquote node, we want to put the block handle agains
    // the parent node.
    const $pos = view.state.doc.resolve(pos)
    if ($pos.depth > 0 && $pos.index($pos.depth) === 0) {
      const parentPos = $pos.before($pos.depth)
      const parentNode = $pos.parent
      const parentElement = view.nodeDOM(parentPos)
      handleElement(parentNode, parentPos, element, parentElement)
    } else {
      handleElement(node, pos, element)
    }
  }

  return union(
    defineDOMEventHandler('pointermove', throttle(handlePointerEvent, 200)),
    defineDOMEventHandler('pointerout', handlePointerEvent),
    defineDOMEventHandler('keypress', () => handler(null, null)),
  )
}

function findBlockByCoordinate(view: EditorView, x: number, y: number): { node: ProseMirrorNode; pos: number } | undefined {
  const dom = view.dom
  const rect = getClientRect(dom)
  if (!isWithinRect(rect, x, y)) {
    return
  }

  let parent: ProseMirrorNode | undefined = view.state.doc
  let pos = -1

  while (parent) {
    if (parent.isBlock && (parent.isTextblock || parent.isAtom || parent.type.spec.isolating)) {
      return { node: parent, pos }
    }

    // Collect all children and their positions
    const children: ProseMirrorNode[] = []
    const positions: number[] = []
    parent.forEach((child, offset) => {
      children.push(child)
      positions.push(offset + pos + 1)
    })

    let lo = 0
    let hi = children.length - 1

    while (lo <= hi) {
      const i = hi - ((hi - lo) >> 1)
      const childDOM = view.nodeDOM(positions[i])
      const childRect = getNodeRect(childDOM)
      if (!childRect) {
        console.warn('[prosekit] Unable to get rect at position', positions[i])
        return
      }
      if (childRect.top > y) {
        hi = i - 1
      } else if (childRect.bottom < y) {
        lo = i + 1
      } else {
        lo = i
        break
      }
    }

    if (lo > hi) {
      return
    }

    parent = children[lo]
    pos = positions[lo]
  }
}

function getNodeRect(node: Node | null | undefined): Rect | undefined {
  if (node && isElement(node) && node.isConnected) {
    return getClientRect(node)
  }
}

function isWithinRect(rect: Rect, x: number, y: number) {
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
}

export interface Rect {
  top: number
  right: number
  bottom: number
  left: number
}

function findFirstLineRect(outer?: Node | null, inner?: Node | null): Rect | undefined {
  if (outer && !outer.isConnected) {
    return
  }
  if (inner && !inner.isConnected) {
    return
  }

  if (outer && inner) {
    const outerRect = findOuterRect(outer)
    const innerRect = findFirstLineRectInNode(inner)
    if (outerRect && innerRect) {
      const { top, bottom } = innerRect
      const { left, right } = outerRect
      return { top, bottom, left, right }
    } else {
      return outerRect || innerRect
    }
  } else if (outer) {
    return findFirstLineRectInNode(outer)
  } else if (inner) {
    return findFirstLineRectInNode(inner)
  }
}

function findOuterRect(node: Node): Rect | undefined {
  if (!isElement(node)) {
    return
  }

  const rect = getClientRect(node)
  const style = node.ownerDocument.defaultView?.getComputedStyle(node)
  const marginLeft = style && Number.parseInt(style.marginLeft, 10) || 0
  const marginRight = style && Number.parseInt(style.marginRight, 10) || 0
  const left = rect.left - marginLeft
  const right = rect.right + marginRight

  return { top: rect.top, bottom: rect.bottom, left, right }
}

function findFirstLineRectInNode(node: Node): Rect | undefined {
  if (isElement(node)) {
    return findFirstLineRectInElement(node)
  } else if (isTextNode(node)) {
    return findFirstLineRectInTextNode(node)
  }
}

function findFirstLineRectInTextNode(node: Text): Rect | undefined {
  const ownerDocument = node.ownerDocument
  if (!ownerDocument) {
    return
  }
  const range = ownerDocument.createRange()
  range.setStart(node, 0)
  range.setEnd(node, 0)
  const rects = range.getClientRects()
  return rects[0]
}

function findFirstLineRectInElement(element: Element): Rect | undefined {
  if (element.nodeName === 'BR') {
    return element.getBoundingClientRect()
  }

  const rect = getClientRect(element)
  const style = element.ownerDocument.defaultView?.getComputedStyle(element)
  const marginLeft = style && Number.parseInt(style.marginLeft, 10) || 0
  const marginRight = style && Number.parseInt(style.marginRight, 10) || 0
  const left = rect.left - marginLeft
  const right = rect.right + marginRight

  const lineHeight = style && Number.parseInt(style.lineHeight, 10) || 24
  const paddingTop = style && Number.parseInt(style.paddingTop, 10) || 0
  const borderTop = style && Number.parseInt(style.borderTopWidth, 10) || 0
  const top = rect.top + paddingTop + borderTop
  const bottom = top + lineHeight

  return { top, bottom, left, right }
}

function fulfillRect({ top, right, bottom, left }: Rect) {
  return { top, right, bottom, left, width: right - left, height: bottom - top, x: left, y: top }
}

// A fallback rect that is far away from the screen. It should not be used through.
const fallbackRect = Object.freeze({
  top: -9999,
  right: -9999,
  bottom: -9999,
  left: -9999,
  width: 0,
  height: 0,
  x: -9999,
  y: -9999,
})
