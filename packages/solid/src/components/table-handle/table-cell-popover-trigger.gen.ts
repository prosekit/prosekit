import { 
  defaultTableCellPopoverTriggerProps,
  type TableCellPopoverTriggerElement,
  type TableCellPopoverTriggerProps,
} from '@prosekit/web/table-handle'

import { createComponent } from '../create-component'

export const TableCellPopoverTrigger = createComponent<
  TableCellPopoverTriggerProps,
  TableCellPopoverTriggerElement
>(
  'prosekit-table-cell-popover-trigger', 
  defaultTableCellPopoverTriggerProps,
)
