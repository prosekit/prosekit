import {
  defaultTableCellPopoverTriggerProps,
  type TableCellPopoverTriggerElement,
  type TableCellPopoverTriggerProps
} from '@prosekit/web/table-handle'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react'

import { createComponent } from '../create-component'

export const TableCellPopoverTrigger: ForwardRefExoticComponent<
  Partial<TableCellPopoverTriggerProps> &
  RefAttributes<TableCellPopoverTriggerElement> &
  HTMLAttributes<TableCellPopoverTriggerElement>
> = createComponent<
  TableCellPopoverTriggerProps, 
  TableCellPopoverTriggerElement
>(
  'prosekit-table-cell-popover-trigger',
  'TableCellPopoverTrigger',
  defaultTableCellPopoverTriggerProps,
)
