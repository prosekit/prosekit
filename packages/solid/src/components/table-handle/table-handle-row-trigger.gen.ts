import { 
  defaultTableHandleRowTriggerProps,
  type TableHandleRowTriggerElement,
  type TableHandleRowTriggerProps,
} from '@prosekit/web/table-handle'

import { createComponent } from '../create-component'

export const TableHandleRowTrigger = createComponent<
  TableHandleRowTriggerProps,
  TableHandleRowTriggerElement
>(
  'prosekit-table-handle-row-trigger', 
  defaultTableHandleRowTriggerProps,
)
