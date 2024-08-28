import {
  defaultTableHandlePopoverItemProps,
  type TableHandlePopoverItemElement,
  type TableHandlePopoverItemProps
} from '@prosekit/web/table-handle'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react'

import { createComponent } from '../create-component'

export const TableHandlePopoverItem: ForwardRefExoticComponent<
  Partial<TableHandlePopoverItemProps> &
  RefAttributes<TableHandlePopoverItemElement> &
  HTMLAttributes<TableHandlePopoverItemElement>
> = createComponent<
  TableHandlePopoverItemProps, 
  TableHandlePopoverItemElement
>(
  'prosekit-table-handle-popover-item',
  'TableHandlePopoverItem',
  defaultTableHandlePopoverItemProps,
)
