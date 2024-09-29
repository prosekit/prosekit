import { tableHandlePopoverItemProps, tableHandlePopoverItemEvents, type TableHandlePopoverItemProps, type TableHandlePopoverItemEvents } from '@prosekit/web/table-handle'

import { createComponent } from '../create-component'

export const TableHandlePopoverItem = createComponent<
  TableHandlePopoverItemProps,
  TableHandlePopoverItemEvents
>(
  'prosekit-table-handle-popover-item',
  'TableHandlePopoverItem',
  Object.keys(tableHandlePopoverItemProps),
  Object.keys(tableHandlePopoverItemEvents),
)
