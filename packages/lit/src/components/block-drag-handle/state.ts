import {
  assignProps,
  mapSignals,
  useEffect,
  useEventListener,
  type ConnectableElement,
  type SingalState,
} from '@aria-ui/core'
import { Fragment, Slice } from '@prosekit/pm/model'
import { NodeSelection } from '@prosekit/pm/state'

import { blockPositionerContext } from '../block-positioner'

import { defaultBlockDragHandleProps, type BlockDragHandleProps } from './props'

export function useBlockDragHandle(
  host: ConnectableElement,
  props?: Partial<BlockDragHandleProps>,
): SingalState<BlockDragHandleProps> {
  const context = blockPositionerContext.consume(host)

  const state = mapSignals(assignProps(defaultBlockDragHandleProps, props))

  useEffect(host, () => {
    host.draggable = true
  })

  useEventListener(host, 'pointerdown', () => {
    const { pos } = context.value ?? {}
    const { view } = state.editor.value ?? {}

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
    const { pos, element, node } = context.value ?? {}
    const { view } = state.editor.value ?? {}

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

  return state
}
