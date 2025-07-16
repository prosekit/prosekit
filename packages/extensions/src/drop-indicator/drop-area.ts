import {
  isHTMLElement,
  once,
} from '@ocavue/utils'
import type { ProseMirrorNode } from '@prosekit/pm/model'
import type { EditorView } from '@prosekit/pm/view'
import type { Rect } from 'prosemirror-tables'

import type { DropTarget } from './drop-target'
import { findCloserDropTarget } from './drop-target'
import { unionRect } from './rect'

export interface DropArea {
  pos: number
  getRect(): Rect
  getDropTarget(x: number, y: number): DropTarget
}

export function buildDropAreaTree(
  view: EditorView,
): DropArea {
  return buildDropArea(view, -1, view.state.doc, view.dom)
}

function buildDropArea(
  view: EditorView,
  pos: number,
  node: ProseMirrorNode,
  dom: HTMLElement,
): DropArea {
  const getChildren = once((): Array<DropArea> => {
    let children: Array<DropArea> = []
    let childPos = pos + 1
    for (const child of node.children) {
      if (child.isBlock) {
        const childDom = view.nodeDOM(childPos)
        if (childDom && isHTMLElement(childDom)) {
          children.push(
            buildDropArea(
              view,
              childPos,
              child,
              childDom,
            ),
          )
        }
      }
      childPos += child.nodeSize
    }
    return children
  })

  const getRect = once((): Rect => {
    if (pos < 0) {
      let children = getChildren()
      if (children.length > 0) {
        const firstRect = children[0].getRect()
        const lastRect = children[children.length - 1].getRect()
        if (firstRect && lastRect) {
          return unionRect(firstRect, lastRect)
        }
      }
    }

    return dom.getBoundingClientRect()
  })

  let cachedX = -1
  let cachedY = -1
  let cachedDropTarget: DropTarget | undefined

  const getDropTarget = (x: number, y: number): DropTarget => {
    if (cachedX === x && cachedY === y && cachedDropTarget) {
      return cachedDropTarget
    }
    cachedX = x
    cachedY = y
    cachedDropTarget = findDropTarget(x, y)
    return cachedDropTarget
  }

  const findDropTarget = (x: number, y: number): DropTarget => {
    const { top, bottom, left, right } = getRect()

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
    let targetBest: DropTarget = findCloserDropTarget(targetTop, targetBottom)

    if (node.isBlock && (node.isTextblock || node.isAtom || node.type.spec.isolating)) {
      return targetBest
    }

    const children = getChildren()
    if (children.length === 0) {
      return targetBest
    }

    let lo = 0
    let hi = children.length - 1

    while (lo <= hi) {
      if (hi - lo < 2) {
        for (let i = lo; i <= hi; i++) {
          let child = children[i]
          if (child.getRect().top <= y && y <= child.getRect().bottom) {
            const targetNext = child.getDropTarget(x, y)
            targetBest = findCloserDropTarget(targetBest, targetNext)
            break
          }
        }
        break
      }

      let i = (lo + hi) >> 1
      let child = children[i]
      if (child.getRect().top <= y && y <= child.getRect().bottom) {
        const targetNext = child.getDropTarget(x, y)
        targetBest = findCloserDropTarget(targetBest, targetNext)
        lo = i
        hi = i
        break
      }
      if (y <= child.getRect().top) {
        hi = i
        continue
      }
      if (y >= child.getRect().bottom) {
        lo = i
        continue
      }
      // Unexpected path
      break
    }

    return targetBest
  }

  return {
    pos,
    getRect,
    getDropTarget,
  }
}
