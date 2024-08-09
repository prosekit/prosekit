import {
  useAttribute,
  type ConnectableElement,
  type SignalState,
} from '@aria-ui/core'
import { useMenuItem } from '@aria-ui/menu'

import type { TableCellPopoverItemProps } from './props'

export function useTableCellPopoverItem(
  element: ConnectableElement,
  state: SignalState<TableCellPopoverItemProps>,
) {
  useAttribute(element, 'data-disabled', () =>
    state.disabled?.get() ? 'true' : 'false',
  )
  useMenuItem(element, state)
}
