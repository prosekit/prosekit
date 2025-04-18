import {
  type ConnectableElement,
  type SetupOptions,
} from '@aria-ui/core'
import { useMenuItem } from '@aria-ui/menu/elements'

import type {
  TableHandlePopoverItemEvents,
  TableHandlePopoverItemProps,
} from './types'

export function useTableHandlePopoverItem(
  element: ConnectableElement,
  {
    state,
    emit,
  }: SetupOptions<TableHandlePopoverItemProps, TableHandlePopoverItemEvents>,
): void {
  useMenuItem(element, { state, emit })
}
