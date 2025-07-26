import { isHTMLElement } from '@ocavue/utils'
import type {
  ResolvedPos,
  Slice,
} from '@prosekit/pm/model'
import {
  NodeSelection,
  Plugin,
  PluginKey,
  TextSelection,
  type PluginView,
} from '@prosekit/pm/state'
import type { EditorView } from '@prosekit/pm/view'

import {
  createAnchorFinder,
  type Anchor,
} from './v3_drop-anchor'
import type { DropIndicatorPluginOptions } from './v3_types'

/**
 * @internal
 */
export function createDropIndicatorPlugin(options: DropIndicatorPluginOptions): Plugin {
  return new Plugin({
    key: new PluginKey('prosekit-drop-indicator'),
    view: (view) => {
      return createDropIndicatorView(view, options)
    },
    props: {
      handleDrop(view, event, slice, move) {
        const findAnchor = createAnchorFinder(view, options.onDrag)
        const point = { x: event.clientX, y: event.clientY }
        const anchor = findAnchor(point, event)
        if (anchor) {
          event.preventDefault()
          let insertPos = anchor.pos

          let tr = view.state.tr
          if (move) {
            interface Dragging {
              readonly slice: Slice
              readonly move: boolean
              readonly node?: NodeSelection
            }
            let { node } = (view.dragging as Dragging | null) || {}
            if (node) node.replace(tr)
            else tr.deleteSelection()
          }

          let pos = tr.mapping.map(insertPos)
          let isNode = slice.openStart == 0 && slice.openEnd == 0 && slice.content.childCount == 1
          let beforeInsert = tr.doc
          if (isNode) tr.replaceRangeWith(pos, pos, slice.content.firstChild!)
          else tr.replaceRange(pos, pos, slice)
          if (tr.doc.eq(beforeInsert)) return

          let $pos = tr.doc.resolve(pos)
          if (
            isNode && NodeSelection.isSelectable(slice.content.firstChild!)
            && $pos.nodeAfter && $pos.nodeAfter.sameMarkup(slice.content.firstChild!)
          ) {
            tr.setSelection(new NodeSelection($pos))
          } else {
            let end = tr.mapping.map(insertPos)
            tr.mapping.maps[tr.mapping.maps.length - 1].forEach((_from, _to, _newFrom, newTo) => end = newTo)
            tr.setSelection(selectionBetween(view, $pos, tr.doc.resolve(end)))
          }
          view.focus()
          view.dispatch(tr.setMeta('uiEvent', 'drop'))
          return true
        }
      },
    },
  })
}

function selectionBetween(view: EditorView, $anchor: ResolvedPos, $head: ResolvedPos, bias?: number) {
  return view.someProp('createSelectionBetween', f => f(view, $anchor, $head))
    || TextSelection.between($anchor, $head, bias)
}

function createDropIndicatorView(view: EditorView, options: DropIndicatorPluginOptions): PluginView {
  let dom = view.dom
  let frame: number | null = null
  let element: HTMLElement | null = null
  let isDraggingOver = false

  const findAnchor = createAnchorFinder(view, options.onDrag)

  const cancel = () => {
    if (frame) {
      // TODO: fallback to clearTimeout?
      cancelAnimationFrame(frame)
    }
    frame = null
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
    let point = { x: event.clientX, y: event.clientY }
    const anchor = findAnchor(point, event)
    if (anchor) {
      event.preventDefault()
    }
    cancel()
  }
  const handleDragLeave = (_event: DragEvent): void => {
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

  const destroy = () => {
    dom.removeEventListener('dragover', handleDragOver)
    dom.removeEventListener('dragend', handleDragEnd)
    dom.removeEventListener('drop', handleDrop)
    dom.removeEventListener('dragleave', handleDragLeave)
  }

  return { destroy }
}
