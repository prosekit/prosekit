import { isHTMLElement } from '@ocavue/utils'
import type { ProseMirrorNode } from '@prosekit/pm/model'
import type { EditorView } from '@prosekit/pm/view'

import type { Point } from './v3_types'

interface Anchor {
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

function createDragState(view: EditorView) {
  let destroyed = false
  let anchors = collectAnchors(view)
  let prevPoint: Point | null = null

  return {
    update(point: Point) {
      if (destroyed || pointEqual(prevPoint, point)) {
        return
      }
      prevPoint = point
    },
    destroy() {
      anchors.length = 0
      destroyed = true
    },
  }
}

function pointEqual(a: Point | null, b: Point | null) {
  return (a && b && a.x === b.x && a.y === b.y) || (!a && !b)
}
