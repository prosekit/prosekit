import { 
  defaultTableColumnPopoverTriggerProps,
  type TableColumnPopoverTriggerElement,
  type TableColumnPopoverTriggerProps,
} from '@prosekit/web/table-handle'

import { createComponent } from '../create-component'

export const TableColumnPopoverTrigger = createComponent<
  TableColumnPopoverTriggerProps,
  TableColumnPopoverTriggerElement
>(
  'prosekit-table-column-popover-trigger', 
  defaultTableColumnPopoverTriggerProps,
)
