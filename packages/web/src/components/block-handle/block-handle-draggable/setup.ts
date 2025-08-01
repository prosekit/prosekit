import {
  useAttribute,
  useEffect,
  useEventListener,
  type ConnectableElement,
  type ReadonlySignal,
  type SignalState,
} from '@aria-ui/core'
import { isHTMLElement } from '@ocavue/utils'
import type { Editor } from '@prosekit/core'
import {
  Fragment,
  Slice,
} from '@prosekit/pm/model'
import { NodeSelection } from '@prosekit/pm/state'

import {
  blockPopoverContext,
  draggingContext,
  type BlockPopoverContext,
} from '../context'

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

  useEffect(host, () => {
    host.draggable = true
  })

  usePointerDownHandler(host, context, state.editor)
  useDraggingPreview(host, context, state.editor)
  useDataDraggingAttribute(host)
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

function useDraggingPreview(
  host: ConnectableElement,
  context: ReadonlySignal<BlockPopoverContext>,
  editor: ReadonlySignal<Editor | null>,
) {
  useEventListener(host, 'dragstart', (event) => {
    const hoverState = context.get()
    const { view } = editor.get() ?? {}

    if (!hoverState || !view || !event.dataTransfer) {
      return
    }

    const { node, pos } = hoverState

    const element = view.nodeDOM(pos)
    if (!element || !isHTMLElement(element)) {
      return
    }

    event.dataTransfer.clearData()
    event.dataTransfer.setData('text/html', element.outerHTML)
    event.dataTransfer.effectAllowed = 'copyMove'
    setDragPreview(event, element)

    // An object matching the internal ProseMirror API shape.
    // See https://github.com/ProseMirror/prosemirror-view/blob/1.38.1/src/input.ts#L657
    const dragging = {
      slice: new Slice(Fragment.from(node), 0, 0),
      move: true,
      node: NodeSelection.create(view.state.doc, pos),
    }

    view.dragging = dragging
  })
}

function useDataDraggingAttribute(host: ConnectableElement): void {
  const dragging = useDragging(host)
  useAttribute(host, 'data-dragging', () => (dragging.get() ? '' : undefined))
}

function useDragging(host: ConnectableElement): ReadonlySignal<boolean> {
  const dragging = draggingContext.consume(host)

  useEventListener(host, 'dragstart', () => {
    dragging.set(true)
  })

  useEventListener(host, 'dragend', () => {
    dragging.set(false)
  })

  return dragging
}
