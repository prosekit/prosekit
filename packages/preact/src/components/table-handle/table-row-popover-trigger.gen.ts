import {
  defaultTableRowPopoverTriggerProps,
  type TableRowPopoverTriggerElement,
  type TableRowPopoverTriggerProps,
} from '@prosekit/web/table-handle'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'preact/compat'

import { createComponent } from '../create-component'

export const TableRowPopoverTrigger: ForwardRefExoticComponent<
  Partial<TableRowPopoverTriggerProps> &
  RefAttributes<TableRowPopoverTriggerElement> &
  HTMLAttributes<TableRowPopoverTriggerElement>
> = createComponent<
  TableRowPopoverTriggerProps, 
  TableRowPopoverTriggerElement
>(
  'prosekit-table-row-popover-trigger',
  'TableRowPopoverTrigger',
  defaultTableRowPopoverTriggerProps,
)
