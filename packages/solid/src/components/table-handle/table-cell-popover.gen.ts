import { 
  TableCellPopoverElement,
  defaultTableCellPopoverProps,
  type TableCellPopoverProps,
} from '@prosekit/web/table-handle'

import { createComponent } from '../create-component'

export const TableCellPopover = createComponent<
  TableCellPopoverProps,
  TableCellPopoverElement
>(
  'prosekit-table-cell-popover', 
  defaultTableCellPopoverProps,
)
