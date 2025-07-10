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

const colors = [
  '#f06292',
  '#ba68c8',
  '#9575cd',
  '#7986cb',
  '#64b5f6',
  '#4fc3f7',
  '#4dd0e1',
  '#4db6ac',
  '#81c784',
  '#aed581',
  '#ffb74d',
  '#ffa726',
  '#ff8a65',
  '#d4e157',
  '#ffd54f',
  '#ffecb3',
]

function pickRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)]
}

export function drawNodeRect(nodeRect: NodeRect): void {
  let container = getContainer()
  container.innerHTML = ''
  container.className = 'pointer-events-none fixed'
  container.style.zIndex = '1000000'
  const nodeRects = [nodeRect]

  while (nodeRects.length > 0) {
    const nodeRect = nodeRects.pop()!
    let dom = document.createElement('div')
    dom.className = 'pointer-events-none fixed'
    dom.style.outlineColor = pickRandomColor() + '30'
    dom.style.outlineStyle = 'solid'
    dom.style.outlineWidth = '5px'

    let { top, left, right, bottom } = nodeRect.rect
    let height = bottom - top
    let width = right - left

    dom.style.top = top + 'px'
    dom.style.left = left + 'px'
    dom.style.height = height + 'px'
    dom.style.width = width + 'px'

    container.append(dom)
    nodeRects.push(...nodeRect.children)
  }
}

function getContainer(): HTMLElement {
  let dom = document.querySelector('#DEBUG_NODE_RECT_TREE_ID')
  if (!dom || !isHTMLElement(dom)) {
    const dom2 = document.createElement('div')
    dom2.id = 'DEBUG_NODE_RECT_TREE_ID'
    document.body.append(dom2)
    return dom2
  }
  return dom
}

export function drawDebugOutline(view: EditorView): void {
  const nodeRect = getNodeRect(view)
  if (nodeRect) {
    drawNodeRect(nodeRect)
  }
}
