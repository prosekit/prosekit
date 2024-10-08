import {
  tableHandlePopoverItemProps,
  tableHandlePopoverItemEvents,
  type TableHandlePopoverItemProps as Props,
  type TableHandlePopoverItemEvents as Events,
} from '@prosekit/web/table-handle'

import { createComponent } from '../create-component'

/**
 * Props for the {@link TableHandlePopoverItem} component.
 */
export interface TableHandlePopoverItemProps extends Partial<Props> {}

/**
 * Events for the {@link TableHandlePopoverItem} component.
 */
export interface TableHandlePopoverItemEvents extends Partial<Events> {}

export const TableHandlePopoverItem = createComponent<
  TableHandlePopoverItemProps,
  TableHandlePopoverItemEvents
>(
  'prosekit-table-handle-popover-item',
  'TableHandlePopoverItem',
  Object.keys(tableHandlePopoverItemProps),
  Object.keys(tableHandlePopoverItemEvents),
)
