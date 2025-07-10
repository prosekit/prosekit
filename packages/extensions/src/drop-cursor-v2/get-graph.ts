import { isHTMLElement } from '@ocavue/utils'
import type { ProseMirrorNode } from '@prosekit/pm/model'
import type { EditorView } from '@prosekit/pm/view'

interface Rect {
  readonly bottom: number
  readonly left: number
  readonly right: number
  readonly top: number
}

function mergeRect(a: Rect, b: Rect): Rect {
  const rects = [a, b]
  return {
    top: Math.min(...rects.map(rect => rect.top)),
    right: Math.max(...rects.map(rect => rect.right)),
    bottom: Math.max(...rects.map(rect => rect.bottom)),
    left: Math.min(...rects.map(rect => rect.left)),
  }
}

interface NodeRect {
  pos: number
  node: ProseMirrorNode
  rect: Rect
  children: NodeRect[]
}

export function getNodeRect(view: EditorView): NodeRect | undefined {
  return getNodeRectAt(
    view,
    view.state.doc,
    -1,
    view.dom,
  )
}

function getNodeRectAt(view: EditorView, node: ProseMirrorNode, pos: number, dom: Node | null): NodeRect | undefined {
  if (!dom || !isHTMLElement(dom)) {
    return
  }
  let children: Array<NodeRect | undefined> = []
  let childPos = pos + 1
  for (const child of node.children) {
    if (child.isBlock) {
      children.push(getNodeRectAt(view, child, childPos, view.nodeDOM(childPos)))
    }
    childPos += child.nodeSize
  }

  return {
    pos,
    node,
    rect: dom.getBoundingClientRect(),
    children: children.filter(x => !!x),
  }
}
