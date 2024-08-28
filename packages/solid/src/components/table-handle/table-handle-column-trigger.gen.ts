import { 
  defaultTableHandleColumnTriggerProps,
  type TableHandleColumnTriggerElement,
  type TableHandleColumnTriggerProps,
} from '@prosekit/web/table-handle'

import { createComponent } from '../create-component'

export const TableHandleColumnTrigger = createComponent<
  TableHandleColumnTriggerProps,
  TableHandleColumnTriggerElement
>(
  'prosekit-table-handle-column-trigger', 
  defaultTableHandleColumnTriggerProps,
)
