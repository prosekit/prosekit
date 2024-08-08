import { 
  TableCellPopoverItemElement,
  defaultTableCellPopoverItemProps,
  type TableCellPopoverItemProps,
} from '@prosekit/web/table-handle'

import { createComponent } from '../create-component'

export const TableCellPopoverItem = createComponent<
  TableCellPopoverItemProps,
  TableCellPopoverItemElement
>(
  'prosekit-table-cell-popover-item', 
  defaultTableCellPopoverItemProps,
)
