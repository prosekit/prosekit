import { 
  tableHandleColumnTriggerProps,
  tableHandleColumnTriggerEvents,
  type TableHandleColumnTriggerElement,
  type TableHandleColumnTriggerProps,
} from '@prosekit/web/table-handle'

import { createComponent } from '../create-component'

export const TableHandleColumnTrigger = createComponent<
  TableHandleColumnTriggerProps,
  TableHandleColumnTriggerElement
>(
  'prosekit-table-handle-column-trigger', 
  Object.keys(tableHandleColumnTriggerProps),
  Object.keys(tableHandleColumnTriggerEvents),
)
