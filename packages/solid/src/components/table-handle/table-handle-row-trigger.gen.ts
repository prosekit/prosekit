import { 
  type TableHandleRowTriggerElement,
  type TableHandleRowTriggerProps as Props,
  type TableHandleRowTriggerEvents as Events,
  tableHandleRowTriggerProps,
  tableHandleRowTriggerEvents,
} from '@prosekit/web/table-handle'

import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link TableHandleRowTrigger} component.
 */
export interface TableHandleRowTriggerProps extends Partial<CreateProps<Props, Events>> {}

export const TableHandleRowTrigger = createComponent<
  TableHandleRowTriggerProps,
  TableHandleRowTriggerElement
>(
  'prosekit-table-handle-row-trigger', 
  Object.keys(tableHandleRowTriggerProps),
  Object.keys(tableHandleRowTriggerEvents),
)
