import {
  useEffect,
  useEventListener,
  type ConnectableElement,
  type SignalState,
} from '@aria-ui/core'
import { Fragment, Slice } from '@prosekit/pm/model'
import { NodeSelection } from '@prosekit/pm/state'

import { blockPopoverContext } from '../context'

import type { BlockDragHandleProps } from './props'

export function useBlockDragHandle(
  host: ConnectableElement,
  state: SignalState<BlockDragHandleProps>,
): void {
  const context = blockPopoverContext.consume(host)

  useEffect(host, () => {
    host.draggable = true
  })

  useEventListener(host, 'pointerdown', () => {
    const { pos } = context.get() ?? {}
    const { view } = state.editor.get() ?? {}

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

  useEventListener(host, 'dragstart', (event) => {
    const { pos, element, node } = context.get() ?? {}
    const { view } = state.editor.get() ?? {}

    if (pos == null || !element || !node || !view || !event.dataTransfer) {
      return
    }

    event.dataTransfer.clearData()
    event.dataTransfer.setData('text/html', element.outerHTML)
    event.dataTransfer.effectAllowed = 'copyMove'
    event.dataTransfer.setDragImage(element, 0, 0)

    view.dragging = {
      slice: new Slice(Fragment.from(node), 0, 0),
      move: true,
    }
  })
}
