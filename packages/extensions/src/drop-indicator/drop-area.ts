import { isHTMLElement } from '@ocavue/utils'
import type { ProseMirrorNode } from '@prosekit/pm/model'
import type { EditorView } from '@prosekit/pm/view'
import type { Rect } from 'prosemirror-tables'

import { unionRect } from './rect'

// import { getNodeRect } from './node-rect'

// class DropRange {
//   constructor(
//     readonly view: EditorView,
//     readonly pos: number,
//     readonly nodes: ProseMirrorNode[],
//   ) {}

//   get points() {
//     const points: DropPoint[] = []

//     let pos = this.pos

//     for (const node of this.nodes) {
//       const dom = this.view.nodeDOM(pos)
//       if (dom && isHTMLElement(dom)) {
//         const { left, right, top, bottom } = dom.getBoundingClientRect()
//         points.push(new DropPoint(pos, left, right, top))
//         points.push(new DropPoint(pos, left, right, bottom))
//       }
//       pos +=
//     }

//   }
// }

// class DropPoint {
//   constructor(
//     readonly pos: number,
//     readonly left: number,
//     readonly right: number,
//     readonly y: number,
//   ) {}
// }

class DropArea {
  private _children: DropArea[] | undefined

  constructor(
    readonly view: EditorView,
    readonly pos: number,
    readonly node: ProseMirrorNode,
    readonly dom: HTMLElement,
  ) {}

  //   get dom(): HTMLElement | undefined {
  //     let { pos, view } = this
  //     if (pos < 0) {
  //       return view.dom
  //     }
  //     let dom = view.nodeDOM(pos)
  //     if (dom && isHTMLElement(dom)) {
  //       return dom
  //     }
  //   }

  get rect(): Rect {
    let { pos, children, dom } = this

    if (pos < 0) {
      if (this.children.length > 0) {
        const firstRect = children[0].rect
        const lastRect = children[children.length - 1].rect
        if (firstRect && lastRect) {
          return unionRect(firstRect, lastRect)
        }
      }
    }
    return dom.getBoundingClientRect()
  }

  get children(): DropArea[] {
    if (!this._children) {
      let children: Array<DropArea> = []
      let childPos = this.pos + 1
      for (const child of this.node.children) {
        if (child.isBlock) {
          const childDom = this.view.nodeDOM(childPos)
          if (childDom && isHTMLElement(childDom)) {
            children.push(
              new DropArea(
                this.view,
                childPos,
                child,
                childDom,
              ),
            )
          }
        }
        childPos += child.nodeSize
      }

      this._children = children
    }
    return this._children
  }

  findDropTarget(x: number, y: number): DropTarget {
    const { top, bottom, left, right } = this.rect
    const { node, pos } = this

    let distanceTop = Math.abs(top - y)
    let distanceBottom = Math.abs(bottom - y)
    let distanceLeft = Math.abs(left - x)
    let distanceRight = Math.abs(right - x)
    let distanceX = Math.min(distanceLeft, distanceRight)
    let distanceY = Math.min(distanceTop, distanceBottom)

    let targetTop: DropTarget = {
      distance: { x: distanceX, y: distanceY },
      start: { x: left, y: top },
      end: { x: right, y: top },
      pos,
    }
    let targetBottom: DropTarget = {
      distance: { x: distanceX, y: distanceY },
      start: { x: left, y: bottom },
      end: { x: right, y: bottom },
      pos,
    }
    let targetBest: DropTarget = compareDropTarget(targetTop, targetBottom)

    if (node.isBlock && (node.isTextblock || node.isAtom || node.type.spec.isolating)) {
      return targetBest
    }

    const { children } = this
    if (children.length === 0) {
      return targetBest
    }

    let lo = 0
    let hi = children.length - 1

    while (lo <= hi) {
      if (hi - lo < 2) {
        for (let i = lo; i <= hi; i++) {
          let child = children[i]
          if (child.rect.top <= y && y <= child.rect.bottom) {
            const targetNext = child.findDropTarget(x, y)
            targetBest = compareDropTarget(targetBest, targetNext)
            break
          }
        }
        break
      }

      let i = (lo + hi) >> 1
      let child = children[i]
      if (child.rect.top <= y && y <= child.rect.bottom) {
        const targetNext = child.findDropTarget(x, y)
        targetBest = compareDropTarget(targetBest, targetNext)
        lo = i
        hi = i
        break
      }
      if (y <= child.rect.top) {
        hi = i
        continue
      }
      if (y >= child.rect.bottom) {
        lo = i
        continue
      }
      // Unexpected path
      break
    }

    return targetBest
  }
}

export function buildDropArea(
  view: EditorView,
): DropArea {
  return new DropArea(
    view,
    -1,
    view.state.doc,
    view.dom,
  )
}

interface DropTarget {
  distance: { x: number; y: number }
  start: { x: number; y: number }
  end: { x: number; y: number }
  pos: number
}

function compareDropTarget(a: DropTarget, b: DropTarget): DropTarget {
  if (a.distance.y < b.distance.y) {
    return a
  }
  if (a.distance.y === b.distance.y && a.distance.x < b.distance.x) {
    return a
  }
  return b
}
