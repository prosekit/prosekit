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

function getContainer(id = 'DEBUG_NODE_RECT_TREE_ID'): HTMLElement {
  let dom = document.querySelector('#' + id)
  if (!dom || !isHTMLElement(dom)) {
    const dom2 = document.createElement('div')
    dom2.id = id
    document.body.append(dom2)
    return dom2
  }

  dom.className = 'pointer-events-none fixed'
  dom.style.zIndex = '1000000'
  return dom
}

export function drawDebugOutline(view: EditorView): void {
  const nodeRect = getNodeRect(view)
  if (nodeRect) {
    drawNodeRect(nodeRect)
  }
}

export function findBestLine(view: EditorView, x: number, y: number): [number, number, number] {
  let bestLine: [number, number, number] = [0, 0, 0]

  const root = getNodeRect(view)
  if (!root) return bestLine

  const nodes = [root]
  let bestDistance = Number.MAX_SAFE_INTEGER

  while (nodes.length > 0) {
    const node = nodes.pop()!
    const { top, right, bottom, left } = node.rect

    let topDistance = calcPointLineDistance(x, y, left, right, top)
    let bottomDistance = calcPointLineDistance(x, y, left, right, bottom)

    console.log('[findBestLine]', {
      x,
      y,
      topDistance,
      bottomDistance,
      top,
      right,
      bottom,
      left,
    })

    if (topDistance < bestDistance) {
      bestDistance = topDistance
      bestLine = [left, right, top]
    }
    if (bottomDistance < bestDistance) {
      bestDistance = bottomDistance
      bestLine = [left, right, bottom]
    }

    nodes.push(...node.children)
  }
  return bestLine
}

function calcPointLineDistance(pointX: number, pointY: number, lineX0: number, lineX1: number, lineY: number) {
  if (lineX0 <= pointX && pointX <= lineX1) {
    return Math.abs(pointY - lineY)
  }
  return Math.min(
    calcPointPointDistance(pointX, pointY, lineX0, lineY),
    calcPointPointDistance(pointX, pointY, lineX1, lineY),
  )
}

function calcPointPointDistance(x0: number, y0: number, x1: number, y1: number): number {
  return Math.abs(x0 - x1) + Math.abs(y0 - y1)
}

let cachedX = 0
let cachedY = 0

export function drawBestLine(view: EditorView, x: number, y: number): void {
  if (x === cachedX && y === cachedY) return

  cachedX = x
  cachedY = y

  let line = findBestLine(view, x, y)
  console.log('line', line)
  if (line[0] === 0 && line[1] === 0) return

  let container = getContainer('DEBUG_BEST_LINE_CONTAINER')

  container.innerHTML = ''
  let dom = document.createElement('div')
  const [lineX0, lineX1, lineY] = line

  dom.style.top = lineY + 'px'
  dom.style.left = lineX0 + 'px'
  dom.style.width = (lineX1 - lineX0) + 'px'

  dom.style.height = '1px'
  dom.style.backgroundColor = 'green'
  dom.style.outlineColor = 'green'
  dom.style.outlineStyle = 'solid'
  dom.style.outlineWidth = '3px'
  dom.className = 'pointer-events-none fixed'

  container.append(dom)
}
