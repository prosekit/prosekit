import { useAttribute, useEffect, useEventListener, type ConnectableElement, type ReadonlySignal, type SignalState } from '@aria-ui/core'
import { isHTMLElement } from '@ocavue/utils'
import type { Editor } from '@prosekit/core'
import type { ViewDragging } from '@prosekit/extensions/drop-indicator'
import { Fragment, Slice } from '@prosekit/pm/model'
import { NodeSelection } from '@prosekit/pm/state'
import type { EditorView } from '@prosekit/pm/view'

import { getBoxElement } from '../../../utils/get-box-element'
import { getSafeEditorView } from '../../../utils/get-safe-editor-view'
import { blockPopoverContext, draggingContext, type BlockPopoverContext, type HoverState } from '../context'

import { setDragPreview } from './set-drag-preview'
import type { BlockHandleDraggableProps } from './types'

/**
 * @internal
 */
export function useBlockHandleDraggable(
  host: ConnectableElement,
  { state }: { state: SignalState<BlockHandleDraggableProps> },
): void {
  const context = blockPopoverContext.consume(host)
  const dragging = draggingContext.consume(host)

  useEffect(host, () => {
    host.draggable = true
  })

  usePointerDownHandler(host, context, state.editor)

  useEventListener(host, 'dragstart', (event) => {
    dragging.set(true)

    const view = getSafeEditorView(state.editor.get())
    const hoverState = context.get()

    if (view && hoverState) {
      view.dom.classList.add('prosekit-dragging')
      createDraggingPreview(view, hoverState, event)
      setViewDragging(view, hoverState)
    }
  })

  useEventListener(host, 'dragend', () => {
    dragging.set(false)

    const view = getSafeEditorView(state.editor.get())
    if (view) {
      view.dom.classList.remove('prosekit-dragging')
    }
  })

  useAttribute(host, 'data-dragging', () => (dragging.get() ? '' : undefined))
}

function usePointerDownHandler(
  host: ConnectableElement,
  context: ReadonlySignal<BlockPopoverContext>,
  editor: ReadonlySignal<Editor | null>,
) {
  useEventListener(host, 'pointerdown', () => {
    const { pos } = context.get() ?? {}
    const { view } = editor.get() ?? {}

    if (pos == null || view == null) {
      return
    }

    view.dispatch(
      view.state.tr.setSelection(NodeSelection.create(view.state.doc, pos)),
    )

    // Clicking the handle will blur the editor, so we need to focus it again.
    // We cannot call `event.preventDefault()` here to prevent the blur
    // because it will prevent the drag event from firing.
    requestAnimationFrame(() => {
      view.focus()
    })
  })
}

function createDraggingPreview(view: EditorView, hoverState: HoverState, event: DragEvent): void {
  if (!event.dataTransfer) {
    return
  }

  const { pos } = hoverState

  const element = view.nodeDOM(pos)
  if (!element || !isHTMLElement(element)) {
    return
  }

  const boxElement = getBoxElement(element)
  if (!boxElement || !isHTMLElement(boxElement)) {
    return
  }

  event.dataTransfer.clearData()
  event.dataTransfer.setData('text/html', boxElement.outerHTML)
  event.dataTransfer.effectAllowed = 'copyMove'
  setDragPreview(event, boxElement)

  return
}

function setViewDragging(view: EditorView, hoverState: HoverState): void {
  const { node, pos } = hoverState

  const dragging: ViewDragging = {
    slice: new Slice(Fragment.from(node), 0, 0),
    move: true,
    node: NodeSelection.create(view.state.doc, pos),
  }

  view.dragging = dragging
}
