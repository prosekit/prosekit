import { type ConnectableElement, type SignalState } from '@aria-ui/core'

import { useBlockPopover } from '../block-popover/state'

import type { BlockHandlePopoverProps } from './props'

export function useBlockHandlePopover(
  host: ConnectableElement,
  state: SignalState<BlockHandlePopoverProps>,
): void {
  useBlockPopover(host, state)
}
