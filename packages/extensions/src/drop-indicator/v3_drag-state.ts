import { isHTMLElement } from '@ocavue/utils'
import type { ProseMirrorNode } from '@prosekit/pm/model'
import type { EditorView } from '@prosekit/pm/view'

import type { Point } from './v3_types'

interface Rect {
  top: number
  bottom: number
  left: number
  right: number
}

type StackItem = [pos: number, node: ProseMirrorNode]
type Anchor = [rect: Rect, node: ProseMirrorNode]

function collectAnchors(view: EditorView): Anchor[] {
  let stack: StackItem[] = [[-1, view.state.doc]]
  let anchors: Anchor[] = []

  while (stack.length > 0) {
    const [pos, node] = stack.pop()!
    if (pos >= 0) {
      let dom = view.nodeDOM(pos)
      if (dom && isHTMLElement(dom)) {
        let rect: Rect = dom.getBoundingClientRect()
        anchors.push([rect, node])
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
  //   let prevPoint: Point | null = null
  //   let currPoint: Point | null = null
  //   let nextPoint: Point | null = null

  let dom = view.dom

  return {
    update(point: Point) {
    },
    destroy() {},
  }
}

function eq(a: Point | null, b: Point | null) {
  return (a && b && a.x === b.x && a.y === b.y) || (!a && !b)
}
