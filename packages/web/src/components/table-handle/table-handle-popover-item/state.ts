import {
  useAttribute,
  type ConnectableElement,
  type SignalState,
} from '@aria-ui/core'
import { useMenuItem } from '@aria-ui/menu'

import type { TableHandlePopoverItemProps } from './props'

export function useTableHandlePopoverItem(
  element: ConnectableElement,
  state: SignalState<TableHandlePopoverItemProps>,
) {
  useAttribute(element, 'data-disabled', () =>
    state.disabled?.get() ? 'true' : 'false',
  )
  useMenuItem(element, state)
}
