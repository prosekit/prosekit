import {
  defaultTableRowPopoverRootProps,
  type TableRowPopoverRootElement,
  type TableRowPopoverRootProps,
} from '@prosekit/web/table-handle'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'preact/compat'

import { createComponent } from '../create-component'

export const TableRowPopoverRoot: ForwardRefExoticComponent<
  Partial<TableRowPopoverRootProps> &
  RefAttributes<TableRowPopoverRootElement> &
  HTMLAttributes<TableRowPopoverRootElement>
> = createComponent<
  TableRowPopoverRootProps, 
  TableRowPopoverRootElement
>(
  'prosekit-table-row-popover-root',
  'TableRowPopoverRoot',
  defaultTableRowPopoverRootProps,
)
