import {
  TableCellPopoverContentElement,
  defaultTableCellPopoverContentProps,
  type TableCellPopoverContentProps,
} from '@prosekit/web/table-handle'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react'

import { createComponent } from '../create-component'

export const TableCellPopoverContent: ForwardRefExoticComponent<
  Partial<TableCellPopoverContentProps> &
  RefAttributes<TableCellPopoverContentElement> &
  HTMLAttributes<TableCellPopoverContentElement>
> = createComponent<
  TableCellPopoverContentProps, 
  TableCellPopoverContentElement
>(
  'prosekit-table-cell-popover-content',
  'TableCellPopoverContent',
  defaultTableCellPopoverContentProps,
)
