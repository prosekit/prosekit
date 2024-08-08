import { 
  defaultTableRowPopoverTriggerProps,
  type TableRowPopoverTriggerElement,
  type TableRowPopoverTriggerProps,
} from '@prosekit/web/table-handle'

import { createComponent } from '../create-component'

export const TableRowPopoverTrigger = createComponent<
  TableRowPopoverTriggerProps,
  TableRowPopoverTriggerElement
>(
  'prosekit-table-row-popover-trigger', 
  defaultTableRowPopoverTriggerProps,
)
