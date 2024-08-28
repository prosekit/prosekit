import { 
  defaultTableHandlePopoverItemProps,
  type TableHandlePopoverItemElement,
  type TableHandlePopoverItemProps,
} from '@prosekit/web/table-handle'

import { createComponent } from '../create-component'

export const TableHandlePopoverItem = createComponent<
  TableHandlePopoverItemProps,
  TableHandlePopoverItemElement
>(
  'prosekit-table-handle-popover-item', 
  defaultTableHandlePopoverItemProps,
)
