import {
  useAttribute,
  useEventListener,
  type ConnectableElement,
  type SignalState,
} from '@aria-ui/core'
import { useMenuItem } from '@aria-ui/menu'

import { tableHandlePopoverContext } from '../context'

import type { TableHandlePopoverItemProps } from './props'

export function useTableHandlePopoverItem(
  element: ConnectableElement,
  state: SignalState<TableHandlePopoverItemProps>,
) {
  useAttribute(element, 'data-disabled', () =>
    state.disabled?.get() ? 'true' : 'false',
  )
  useMenuItem(element, state)

  const context = tableHandlePopoverContext.consume(element)

  useEventListener(element, 'pointerdown', () => {
    const command = state.command?.get()
    const { cellAxis, table } = context.get()
    if (!table) return
    command?.(table, cellAxis)
  })
}
