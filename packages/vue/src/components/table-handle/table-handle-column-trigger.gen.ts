import { tableHandleColumnTriggerProps, tableHandleColumnTriggerEvents, type TableHandleColumnTriggerProps, type TableHandleColumnTriggerEvents } from '@prosekit/web/table-handle'

import { createComponent } from '../create-component'

export const TableHandleColumnTrigger = createComponent<
  TableHandleColumnTriggerProps,
  TableHandleColumnTriggerEvents
>(
  'prosekit-table-handle-column-trigger',
  'TableHandleColumnTrigger',
  Object.keys(tableHandleColumnTriggerProps),
  Object.keys(tableHandleColumnTriggerEvents),
)
