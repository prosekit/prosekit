import {
  tableHandleColumnTriggerProps,
  tableHandleColumnTriggerEvents,
  type TableHandleColumnTriggerProps as Props,
  type TableHandleColumnTriggerEvents as Events,
} from '@prosekit/web/table-handle'

import { createComponent } from '../create-component'

/**
 * Props for the {@link TableHandleColumnTrigger} component.
 */
export interface TableHandleColumnTriggerProps extends Partial<Props> {}

/**
 * Events for the {@link TableHandleColumnTrigger} component.
 */
export interface TableHandleColumnTriggerEvents extends Partial<Events> {}

export const TableHandleColumnTrigger = createComponent<
  TableHandleColumnTriggerProps,
  TableHandleColumnTriggerEvents
>(
  'prosekit-table-handle-column-trigger',
  'TableHandleColumnTrigger',
  Object.keys(tableHandleColumnTriggerProps),
  Object.keys(tableHandleColumnTriggerEvents),
)
