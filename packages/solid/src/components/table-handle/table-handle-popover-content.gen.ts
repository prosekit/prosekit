import { 
  tableHandlePopoverContentProps,
  tableHandlePopoverContentEvents,
  type TableHandlePopoverContentElement,
  type TableHandlePopoverContentProps,
} from '@prosekit/web/table-handle'

import { createComponent } from '../create-component'

export const TableHandlePopoverContent = createComponent<
  TableHandlePopoverContentProps,
  TableHandlePopoverContentElement
>(
  'prosekit-table-handle-popover-content', 
  Object.keys(tableHandlePopoverContentProps),
  Object.keys(tableHandlePopoverContentEvents),
)
