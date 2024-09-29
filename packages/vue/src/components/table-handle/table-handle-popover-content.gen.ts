import { tableHandlePopoverContentProps, tableHandlePopoverContentEvents, type TableHandlePopoverContentProps, type TableHandlePopoverContentEvents } from '@prosekit/web/table-handle'

import { createComponent } from '../create-component'

export const TableHandlePopoverContent = createComponent<
  TableHandlePopoverContentProps,
  TableHandlePopoverContentEvents
>(
  'prosekit-table-handle-popover-content',
  'TableHandlePopoverContent',
  Object.keys(tableHandlePopoverContentProps),
  Object.keys(tableHandlePopoverContentEvents),
)
