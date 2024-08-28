import {
  defaultTableColumnPopoverRootProps,
  type TableColumnPopoverRootElement,
  type TableColumnPopoverRootProps,
} from '@prosekit/web/table-handle'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'preact/compat'

import { createComponent } from '../create-component'

export const TableColumnPopoverRoot: ForwardRefExoticComponent<
  Partial<TableColumnPopoverRootProps> &
  RefAttributes<TableColumnPopoverRootElement> &
  HTMLAttributes<TableColumnPopoverRootElement>
> = createComponent<
  TableColumnPopoverRootProps, 
  TableColumnPopoverRootElement
>(
  'prosekit-table-column-popover-root',
  'TableColumnPopoverRoot',
  defaultTableColumnPopoverRootProps,
)
