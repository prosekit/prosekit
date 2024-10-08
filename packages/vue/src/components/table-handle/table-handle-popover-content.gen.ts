import {
  tableHandlePopoverContentProps,
  tableHandlePopoverContentEvents,
  type TableHandlePopoverContentProps as Props,
  type TableHandlePopoverContentEvents as Events,
} from '@prosekit/web/table-handle'

import { createComponent } from '../create-component'

/**
 * Props for the {@link TableHandlePopoverContent} component.
 */
export interface TableHandlePopoverContentProps extends Partial<Props> {}

/**
 * Events for the {@link TableHandlePopoverContent} component.
 */
export interface TableHandlePopoverContentEvents extends Partial<Events> {}

export const TableHandlePopoverContent = createComponent<
  TableHandlePopoverContentProps,
  TableHandlePopoverContentEvents
>(
  'prosekit-table-handle-popover-content',
  'TableHandlePopoverContent',
  Object.keys(tableHandlePopoverContentProps),
  Object.keys(tableHandlePopoverContentEvents),
)
