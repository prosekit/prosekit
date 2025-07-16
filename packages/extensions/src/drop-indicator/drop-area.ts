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
  ) {}

  get dom(): HTMLElement | undefined {
    let { pos, view } = this
    if (pos < 0) {
      return view.dom
    }
    let dom = view.nodeDOM(pos)
    if (dom && isHTMLElement(dom)) {
      return dom
    }
  }

  get rect(): Rect | undefined {
    let { pos, children, dom } = this

    if (pos < 0) {
      if (this.children.length > 0) {
        const firstRect = children[0].rect
        const lastRect = children[children.length - 1].rect
        if (firstRect && lastRect) {
          return unionRect(firstRect, lastRect)
        }
      }
    } else if (dom) {
      return dom.getBoundingClientRect()
    }
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

  //   get dropPoints() {
  //     // pass
  //   }

  //   findDropPoint(x: number, y: number) {
  //     const { node, pos, children } = this
  //     if (node.isBlock && (node.isTextblock || node.isAtom || node.type.spec.isolating)) {
  //       return { node, pos }
  //     }
  //     if (children.length === 0) {
  //       return { node, pos }
  //     }

  //     let lo = 0
  //     let hi = children.length - 1
  //     let bestDistances = { x: Number.MAX_SAFE_INTEGER, y: Number.MAX_SAFE_INTEGER }

  //     while (lo < hi) {
  //       const i = hi - ((hi - lo) >> 1)
  //       const { top, bottom, left, right } = children[i].rect

  //       const distanceY = Math.min(Math.abs(top - y), Math.abs(bottom - y))
  //       const distanceX = Math.min(Math.abs(left - x), Math.abs(right - y))

  //       if (distanceY === )

  //       const childDOM = view.nodeDOM(positions[i])
  //       const childRect = getNodeRect(childDOM)
  //       if (!childRect) {
  //         console.warn(`[prosekit] Unable to get rect at position: ${positions[i]}`)
  //         return
  //       }
  //       if (childRect.top > y) {
  //         hi = i - 1
  //       } else if (childRect.bottom < y) {
  //         lo = i + 1
  //       } else {
  //         lo = i
  //         break
  //       }
  //     }
  //   }
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
