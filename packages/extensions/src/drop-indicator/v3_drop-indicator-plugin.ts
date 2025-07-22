import { isHTMLElement } from '@ocavue/utils'
import {
  Plugin,
  PluginKey,
} from '@prosekit/pm/state'
import type { EditorView } from '@prosekit/pm/view'

import {
  createAnchorFinder,
  type Anchor,
} from './v3_drop-anchor'
import type {
  DropIndicatorPluginOptions,
  Point,
} from './v3_types'

/**
 * @internal
 */
export function createDropIndicatorPlugin(options: DropIndicatorPluginOptions): Plugin {
  return new Plugin({
    key: new PluginKey('prosekit-drop-indicator'),
    view: (view) => {
      return { destroy: registerEvents(view, options) }
    },
  })
}

function registerEvents(view: EditorView, options: DropIndicatorPluginOptions): VoidFunction {
  let currentPoint: Point | null = null
  let dom = view.dom
  let frame: number | null = null
  let width = options.width
  let element: HTMLElement | null = null

  const findAnchor = createAnchorFinder(view, options.onDrag)

  const cancel = () => {
    if (frame) {
      // TODO: fallback to clearTimeout?
      cancelAnimationFrame(frame)
    }
    frame = null
    currentPoint = null
  }

  const removeOverlay = () => {
    if (element) {
      element.remove()
      element = null
    }
  }

  const updateOverlay = (anchor: Anchor) => {
    // const $pos = view.state.doc.resolve(cursorPos)
    // let isBlock = !$pos.parent.inlineContent, rect
    const editorDOM = view.dom
    const editorRect = editorDOM.getBoundingClientRect()
    const scaleX = editorRect.width / editorDOM.offsetWidth, scaleY = editorRect.height / editorDOM.offsetHeight
    // if (isBlock) {
    //   const before = $pos.nodeBefore, after = $pos.nodeAfter
    //   if (before || after) {
    //     const node = view.nodeDOM(cursorPos - (before ? before.nodeSize : 0))
    //     if (node) {
    //       const nodeRect = (node as HTMLElement).getBoundingClientRect()
    //       let top = before ? nodeRect.bottom : nodeRect.top
    //       if (before && after) top = (top + (view.nodeDOM(cursorPos) as HTMLElement).getBoundingClientRect().top) / 2
    //       const halfWidth = (width / 2) * scaleY
    //       rect = { left: nodeRect.left, right: nodeRect.right, top: top - halfWidth, bottom: top + halfWidth }
    //     }
    //   }
    // }
    // if (!rect) {
    //   const coords = view.coordsAtPos(cursorPos)
    //   const halfWidth = (width / 2) * scaleX
    //   rect = { left: coords.left - halfWidth, right: coords.left + halfWidth, top: coords.top, bottom: coords.bottom }
    // }

    const rect = {
      top: anchor.y - 1,
      bottom: anchor.y + 1,
      left: anchor.x1,
      right: anchor.x2,
    }

    let isBlock = 1 + 1 > 1

    const parent = view.dom.offsetParent
    if (!parent || !isHTMLElement(parent)) return

    if (!element) {
      element = parent.appendChild(document.createElement('div'))
      // if (this.class) element.className = this.class
      element.style.cssText = 'position: absolute; z-index: 50; pointer-events: none;'
      // if (this.color) {
      element.style.backgroundColor = 'red' // TODO: just for debug
      // }
    }
    element.classList.toggle('prosemirror-dropcursor-block', isBlock)
    element.classList.toggle('prosemirror-dropcursor-inline', !isBlock)
    let parentLeft, parentTop
    if (parent == document.body && getComputedStyle(parent).position == 'static') {
      parentLeft = -window.pageXOffset
      parentTop = -window.pageYOffset
    } else {
      const rect = parent.getBoundingClientRect()
      const parentScaleX = rect.width / parent.offsetWidth, parentScaleY = rect.height / parent.offsetHeight
      parentLeft = rect.left - parent.scrollLeft * parentScaleX
      parentTop = rect.top - parent.scrollTop * parentScaleY
    }
    element.style.left = (rect.left - parentLeft) / scaleX + 'px'
    element.style.top = (rect.top - parentTop) / scaleY + 'px'
    element.style.width = (rect.right - rect.left) / scaleX + 'px'
    element.style.height = (rect.bottom - rect.top) / scaleY + 'px'
  }

  let isDraggingOver = false

  const handleDragOver = (event: DragEvent): void => {
    isDraggingOver = true

    let point = { x: event.clientX, y: event.clientY }
    let anchor = findAnchor(point, event)
    if (!anchor) return
    updateOverlay(anchor)
  }
  const handleDragEnd = (event: DragEvent): void => {
    console.log('DEBUG handleDragEnd', event.clientX, event.clientY)
    // updatePoint(null)
  }
  const handleDrop = (event: DragEvent): void => {
    console.log('DEBUG handleDrop', event.clientX, event.clientY)
    // updatePoint(null)
    cancel()
  }
  const handleDragLeave = (event: DragEvent): void => {
    isDraggingOver = false
    cancel()
    setTimeout(() => {
      if (!isDraggingOver) {
        console.log('DEBUG handleDragLeave')
        removeOverlay()
      }
    }, 30)
  }

  dom.addEventListener('dragover', handleDragOver)
  dom.addEventListener('dragend', handleDragEnd)
  dom.addEventListener('drop', handleDrop)
  dom.addEventListener('dragleave', handleDragLeave)

  return () => {
    dom.removeEventListener('dragover', handleDragOver)
    dom.removeEventListener('dragend', handleDragEnd)
    dom.removeEventListener('drop', handleDrop)
    dom.removeEventListener('dragleave', handleDragLeave)
  }
}
