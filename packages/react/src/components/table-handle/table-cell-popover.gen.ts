import {
  TableCellPopoverElement,
  defaultTableCellPopoverProps,
  type TableCellPopoverProps,
} from '@prosekit/web/table-handle'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react'

import { createComponent } from '../create-component'

export const TableCellPopover: ForwardRefExoticComponent<
  Partial<TableCellPopoverProps> &
  RefAttributes<TableCellPopoverElement> &
  HTMLAttributes<TableCellPopoverElement>
> = createComponent<
  TableCellPopoverProps, 
  TableCellPopoverElement
>(
  'prosekit-table-cell-popover',
  'TableCellPopover',
  defaultTableCellPopoverProps,
)
