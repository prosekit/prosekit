import { isHTMLElement } from '@ocavue/utils'
import {
  collectChildren,
  debug,
} from '@prosekit/core'
import type {
  NodeType,
  ProseMirrorNode,
} from '@prosekit/pm/model'
import type { EditorView } from '@prosekit/pm/view'

export function getPosAtCoords(view: EditorView, coords: { left: number; top: number }):
  | {
    pos: number
    inside: number
  }
  | undefined
  | null
{
  let insidePos = findInsidePos(view, coords)
  if (insidePos == null) {
    return
  }

  return view.posAtCoords(coords)
}

function findInsidePos(view: EditorView, coords: { left: number; top: number }): number | undefined {
  const pos = view.posAtCoords(coords)
  if (!pos) return

  if (pos.inside > 0) {
    return pos.inside
  }

  return findInsidePosBisection(view, view.state.doc, -1, coords.top)
}

function findInsidePosBisection(view: EditorView, parent: ProseMirrorNode, parentPos: number, clientY: number): number | undefined {
  let nodes = collectChildren(parent)
  let positions: number[] = []
  let pos = parentPos + (parent.isLeaf ? 0 : 1)
  for (const node of nodes) {
    positions.push(pos)
    pos += node.nodeSize
  }

  let lo = 0
  let hi = positions.length

  while (lo < hi) {
    let mi = (lo + hi) >>> 1
    let node = nodes[mi]
    let pos = positions[mi]
    let dom = view.nodeDOM(pos)
    let rect = dom && isHTMLElement(dom) && dom.getBoundingClientRect()
    if (!rect) {
      return
    }

    if (rect.top <= clientY && clientY <= rect.bottom) {
      if (parent.isTextblock || parent.isAtom) {
        return pos
      }
      return findInsidePosBisection(view, node, pos, clientY)
    }

    if (clientY < rect.top) {
      hi = mi
    } else {
      lo = mi + 1
    }
  }

  return lo < positions.length ? positions[lo] : parentPos
}

function isYInRect(rect: DOMRect, y: number): boolean {
  return y >= rect.top && y <= rect.bottom
}

function findCuttingPoint(view: EditorView, pos: number, clientY: number): number | undefined {
  let doc = view.state.doc
  if (pos < 0 || pos > doc.content.size) {
    return
  }

  let $pos = doc.resolve(pos)

  let { node: dom } = view.domAtPos(pos)

  if (isHTMLElement(dom)) {
    let rect = dom.getBoundingClientRect()
    if (clientY >= rect.top && clientY <= rect.bottom) {
      return pos
    }
  }
}

function findNearestBlock(view: EditorView, pos: number): number | undefined {
  if (pos < 0 || pos > view.state.doc.content.size) {
    return undefined
  }

  let node = view.state.doc.nodeAt(pos)

  if (node) {
    // The position is between two nodes, we need to find the nearest block
  }

  let $pos = view.state.doc.resolve(pos)

  // for (let depth = $pos.depth + 1; depth >= 0; depth--) {
  //   const node = $pos.node(depth)
  //   const dom = view.domAtPos(node.pos)
  //   if (node.type.spec.code) {
  //     return undefined
  //   }
  // }

  // if ($pos.parent.type.spec.code) {
  //   return undefined
  // }

  // let node = view.state.doc.nodeAt(pos)
  // if (!node) {
  //   return undefined
  // }

  // view.domAtPos

  return pos
}

function isContainerBlock(type: NodeType): boolean {
}
