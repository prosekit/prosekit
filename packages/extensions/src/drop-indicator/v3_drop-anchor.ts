import { isHTMLElement } from '@ocavue/utils'
import type { ProseMirrorNode } from '@prosekit/pm/model'
import type { EditorView } from '@prosekit/pm/view'

import type {
  DragEventHandler,
  Point,
} from './v3_types'

/**
 * @internal
 */
export interface Anchor {
  pos: number
  x1: number
  x2: number
  y: number
}

type StackItem = [pos: number, node: ProseMirrorNode]

function collectAnchors(view: EditorView): Anchor[] {
  let stack: StackItem[] = [[-1, view.state.doc]]
  let anchors: Anchor[] = []

  while (stack.length > 0) {
    const [pos, node] = stack.pop()!
    if (pos >= 0) {
      let dom = view.nodeDOM(pos)
      if (dom && isHTMLElement(dom)) {
        let { top, bottom, left: x1, right: x2 } = dom.getBoundingClientRect()
        anchors.push(
          { x1, x2, y: top, pos: pos },
          { x1, x2, y: bottom, pos: pos + node.nodeSize },
        )
      }
    }
    if (node.isBlock && !node.isTextblock) {
      let childPos = pos + 1
      for (let child of node.children) {
        stack.push([childPos, child])
        childPos += child.nodeSize
      }
    }
  }

  return anchors
}

function createAnchorsGetter(view: EditorView) {
  let anchors: Anchor[] = []
  let prevDoc: ProseMirrorNode | undefined
  let prevRect: DOMRect | undefined

  return (): Anchor[] => {
    const rect = view.dom.getBoundingClientRect()
    const doc = view.state.doc

    if (
      anchors && prevDoc && prevRect
      && rect.width === prevRect.width
      && rect.height === prevRect.height
      && rect.x === prevRect.x
      && rect.y === prevRect.y
      && prevDoc.eq(view.state.doc)
    ) {
      return anchors
    }

    prevRect = rect
    prevDoc = doc
    anchors = collectAnchors(view)
    return anchors
  }
}

export function createAnchorFinder(view: EditorView, onDrag: DragEventHandler) {
  let getAnchors = createAnchorsGetter(view)
  let prevPoint: Point | undefined
  let prevAnchor: Anchor | undefined

  return (point: Point, event: DragEvent): Anchor | undefined => {
    if (!view.editable || view.isDestroyed) return undefined

    if (pointEqual(prevPoint, point)) {
      return prevAnchor
    }
    prevPoint = point

    // TODO: better performance method?
    const compare = (a: Anchor, b: Anchor): number => {
      const [aX, aY] = calcDistance(a, point)
      const [bX, bY] = calcDistance(b, point)
      if (aY < bY || (aY === bY && aX < bX)) return -1
      if (aX === bX && aY === bY) return a.pos - b.pos
      return 1
    }

    const anchors = getAnchors()
    anchors.sort(compare)

    for (let anchor of anchors) {
      if (onDrag({ view: view, pos: anchor.pos, event }) === false) {
        continue
      }
      prevAnchor = anchor
      return anchor
    }
  }
}

function pointEqual(a?: Point, b?: Point) {
  return (a && b && a.x === b.x && a.y === b.y) || (!a && !b)
}

function calcDistance(a: Anchor, p: Point): [distanceX: number, distanceY: number] {
  return [Math.min(Math.abs(a.x1 - p.x), Math.abs(a.x2 - p.x)), Math.abs(a.y - p.y)]
}
