import {
  createSignal,
  useAttribute,
  useEffect,
  useEventListener,
  type ConnectableElement,
  type ReadonlySignal,
  type SignalState,
} from '@aria-ui/core'
import type { Editor } from '@prosekit/core'
import {
  Fragment,
  Slice,
} from '@prosekit/pm/model'
import { NodeSelection } from '@prosekit/pm/state'

import {
  blockPopoverContext,
  type BlockPopoverContext,
} from '../context'

import type { BlockHandleDraggableProps } from './types'

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

    const { element, node, pos } = hoverState

    event.dataTransfer.clearData()
    event.dataTransfer.setData('text/html', element.outerHTML)
    event.dataTransfer.effectAllowed = 'copyMove'
    event.dataTransfer.setDragImage(element, 0, 0)

    view.dragging = new Dragging(
      new Slice(Fragment.from(node), 0, 0),
      true,
      NodeSelection.create(view.state.doc, pos),
    )
  })
}

function useDataDraggingAttribute(host: ConnectableElement): void {
  const dragging = useDragging(host)
  useAttribute(host, 'data-dragging', () => (dragging.get() ? '' : undefined))
}

function useDragging(host: ConnectableElement): ReadonlySignal<boolean> {
  const dragging = createSignal(false)

  useEventListener(host, 'dragstart', () => {
    dragging.set(true)
  })

  useEventListener(host, 'dragend', () => {
    dragging.set(false)
  })

  return dragging
}

/**
 * Copied from internal ProseMirror API. See also https://github.com/prosemirror/prosemirror-view/commit/9d0eb67f
 *
 * @internal
 */
class Dragging {
  constructor(readonly slice: Slice, readonly move: boolean, readonly node?: NodeSelection) {}
}
