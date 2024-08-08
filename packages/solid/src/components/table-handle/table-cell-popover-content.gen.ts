import { 
  TableCellPopoverContentElement,
  defaultTableCellPopoverContentProps,
  type TableCellPopoverContentProps,
} from '@prosekit/web/table-handle'

import { createComponent } from '../create-component'

export const TableCellPopoverContent = createComponent<
  TableCellPopoverContentProps,
  TableCellPopoverContentElement
>(
  'prosekit-table-cell-popover-content', 
  defaultTableCellPopoverContentProps,
)
