import {
  defaultTableCellPopoverRootProps,
  type TableCellPopoverRootElement,
  type TableCellPopoverRootProps,
} from '@prosekit/web/table-handle'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'preact/compat'

import { createComponent } from '../create-component'

export const TableCellPopoverRoot: ForwardRefExoticComponent<
  Partial<TableCellPopoverRootProps> &
  RefAttributes<TableCellPopoverRootElement> &
  HTMLAttributes<TableCellPopoverRootElement>
> = createComponent<
  TableCellPopoverRootProps, 
  TableCellPopoverRootElement
>(
  'prosekit-table-cell-popover-root',
  'TableCellPopoverRoot',
  defaultTableCellPopoverRootProps,
)
