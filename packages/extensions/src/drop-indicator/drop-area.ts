import { isHTMLElement } from '@ocavue/utils'
import type { ProseMirrorNode } from '@prosekit/pm/model'
import type { EditorView } from '@prosekit/pm/view'

class DropArea {
  private _children: DropArea[] | undefined
  private _rect: Rect | undefined

  constructor(
    readonly view: EditorView,
    readonly pos: number,
    readonly node: ProseMirrorNode,
    readonly dom: HTMLElement,
  ) {}

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

  get rect(): Rect {
    if (!this._rect) {
      this._rect = this.dom.getBoundingClientRect()
    }
    return this._rect
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

interface Rect {
  readonly bottom: number
  readonly left: number
  readonly right: number
  readonly top: number
}
