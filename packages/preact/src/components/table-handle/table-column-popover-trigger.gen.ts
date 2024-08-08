import {
  defaultTableColumnPopoverTriggerProps,
  type TableColumnPopoverTriggerElement,
  type TableColumnPopoverTriggerProps,
} from '@prosekit/web/table-handle'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'preact/compat'

import { createComponent } from '../create-component'

export const TableColumnPopoverTrigger: ForwardRefExoticComponent<
  Partial<TableColumnPopoverTriggerProps> &
  RefAttributes<TableColumnPopoverTriggerElement> &
  HTMLAttributes<TableColumnPopoverTriggerElement>
> = createComponent<
  TableColumnPopoverTriggerProps, 
  TableColumnPopoverTriggerElement
>(
  'prosekit-table-column-popover-trigger',
  'TableColumnPopoverTrigger',
  defaultTableColumnPopoverTriggerProps,
)
