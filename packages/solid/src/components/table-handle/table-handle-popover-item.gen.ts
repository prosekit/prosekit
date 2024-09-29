import { 
  tableHandlePopoverItemProps,
  tableHandlePopoverItemEvents,
  type TableHandlePopoverItemElement,
  type TableHandlePopoverItemProps,
} from '@prosekit/web/table-handle'

import { createComponent } from '../create-component'

export const TableHandlePopoverItem = createComponent<
  TableHandlePopoverItemProps,
  TableHandlePopoverItemElement
>(
  'prosekit-table-handle-popover-item', 
  Object.keys(tableHandlePopoverItemProps),
  Object.keys(tableHandlePopoverItemEvents),
)
