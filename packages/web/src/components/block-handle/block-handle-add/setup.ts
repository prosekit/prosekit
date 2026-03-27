import { useEventListener, type ConnectableElement, type SignalState } from '@aria-ui/core'
import { insertDefaultBlock } from '@prosekit/core'

import { blockPopoverContext } from '../context'

import type { BlockHandleAddProps } from './types'

/**
 * @internal
 */
export function useBlockHandleAdd(
  host: ConnectableElement,
  { state }: { state: SignalState<BlockHandleAddProps> },
): void {
  const context = blockPopoverContext.consume(host)

  useEventListener(host, 'pointerdown', (event) => {
    event.preventDefault()

    const editor = state.editor.get()
    const hoverState = context.get()
    if (!editor || !hoverState) {
      return
    }

    const { node, pos } = hoverState
    editor.exec(insertDefaultBlock({ pos: pos + node.nodeSize }))
    editor.focus()

    // Hide the drag handle
    context.set(null)
  })
}
