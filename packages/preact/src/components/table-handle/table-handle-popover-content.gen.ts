import {
  defaultTableHandlePopoverContentProps,
  type TableHandlePopoverContentElement,
  type TableHandlePopoverContentProps,
} from '@prosekit/web/table-handle'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'preact/compat'

import { createComponent } from '../create-component'

export const TableHandlePopoverContent: ForwardRefExoticComponent<
  Partial<TableHandlePopoverContentProps> &
  RefAttributes<TableHandlePopoverContentElement> &
  HTMLAttributes<TableHandlePopoverContentElement>
> = createComponent<
  TableHandlePopoverContentProps, 
  TableHandlePopoverContentElement
>(
  'prosekit-table-handle-popover-content',
  'TableHandlePopoverContent',
  defaultTableHandlePopoverContentProps,
)
