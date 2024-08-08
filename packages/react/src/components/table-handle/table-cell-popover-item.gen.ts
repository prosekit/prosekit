import {
  TableCellPopoverItemElement,
  defaultTableCellPopoverItemProps,
  type TableCellPopoverItemProps,
} from '@prosekit/web/table-handle'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react'

import { createComponent } from '../create-component'

export const TableCellPopoverItem: ForwardRefExoticComponent<
  Partial<TableCellPopoverItemProps> &
  RefAttributes<TableCellPopoverItemElement> &
  HTMLAttributes<TableCellPopoverItemElement>
> = createComponent<
  TableCellPopoverItemProps, 
  TableCellPopoverItemElement
>(
  'prosekit-table-cell-popover-item',
  'TableCellPopoverItem',
  defaultTableCellPopoverItemProps,
)
