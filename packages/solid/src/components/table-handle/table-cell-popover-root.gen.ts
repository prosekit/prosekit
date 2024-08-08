import { 
  defaultTableCellPopoverRootProps,
  type TableCellPopoverRootElement,
  type TableCellPopoverRootProps,
} from '@prosekit/web/table-handle'

import { createComponent } from '../create-component'

export const TableCellPopoverRoot = createComponent<
  TableCellPopoverRootProps,
  TableCellPopoverRootElement
>(
  'prosekit-table-cell-popover-root', 
  defaultTableCellPopoverRootProps,
)
