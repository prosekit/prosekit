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

export function createDragState(view: EditorView, canDrop: (view: EditorView, pos: number) => boolean) {
  let destroyed = false
  let anchors = collectAnchors(view)
  let prevPoint: Point | null = null

  return {
    update(point: Point): Anchor | undefined {
      if (destroyed || pointEqual(prevPoint, point)) {
        return
      }
      prevPoint = point

      const compare = (a: Anchor, b: Anchor): number => {
        const [aX, aY] = calcDistance(a, point)
        const [bX, bY] = calcDistance(b, point)
        if (aY < bY || (aY === bY && aX < bX)) return -1
        if (aX === bX && aY === bY) return a.pos - b.pos
        return 1
      }

      anchors.sort(compare)

      for (let anchor of anchors) {
        if (canDrop(view, anchor.pos)) {
          return anchor
        }
      }
    },
    destroy(): void {
      anchors.length = 0
      destroyed = true
    },
  }
}

function pointEqual(a: Point | null, b: Point | null) {
  return (a && b && a.x === b.x && a.y === b.y) || (!a && !b)
}

function calcDistance(a: Anchor, p: Point): [xDistance: number, yDistance: number] {
  return [Math.min(Math.abs(a.x1 - p.x), Math.abs(a.x2 - p.x)), Math.abs(a.y - p.y)]
}
