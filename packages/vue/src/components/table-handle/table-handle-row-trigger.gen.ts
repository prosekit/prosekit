import { tableHandleRowTriggerProps, tableHandleRowTriggerEvents, type TableHandleRowTriggerProps, type TableHandleRowTriggerEvents } from '@prosekit/web/table-handle'

import { createComponent } from '../create-component'

export const TableHandleRowTrigger = createComponent<
  TableHandleRowTriggerProps,
  TableHandleRowTriggerEvents
>(
  'prosekit-table-handle-row-trigger',
  'TableHandleRowTrigger',
  Object.keys(tableHandleRowTriggerProps),
  Object.keys(tableHandleRowTriggerEvents),
)
