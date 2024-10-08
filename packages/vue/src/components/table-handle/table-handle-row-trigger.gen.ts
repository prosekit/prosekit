import {
  tableHandleRowTriggerProps,
  tableHandleRowTriggerEvents,
  type TableHandleRowTriggerProps as Props,
  type TableHandleRowTriggerEvents as Events,
} from '@prosekit/web/table-handle'

import { createComponent } from '../create-component'

/**
 * Props for the {@link TableHandleRowTrigger} component.
 */
export interface TableHandleRowTriggerProps extends Partial<Props> {}

/**
 * Events for the {@link TableHandleRowTrigger} component.
 */
export interface TableHandleRowTriggerEvents extends Partial<Events> {}

export const TableHandleRowTrigger = createComponent<
  TableHandleRowTriggerProps,
  TableHandleRowTriggerEvents
>(
  'prosekit-table-handle-row-trigger',
  'TableHandleRowTrigger',
  Object.keys(tableHandleRowTriggerProps),
  Object.keys(tableHandleRowTriggerEvents),
)
