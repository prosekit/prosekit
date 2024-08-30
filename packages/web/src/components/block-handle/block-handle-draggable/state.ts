import { type ConnectableElement, type SignalState } from '@aria-ui/core'

import { useBlockDragHandle } from '../block-drag-handle/state'

import type { BlockHandleDraggableProps } from './props'

export function useBlockHandleDraggable(
  host: ConnectableElement,
  state: SignalState<BlockHandleDraggableProps>,
): void {
  useBlockDragHandle(host, state)
}
