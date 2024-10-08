import {
  tableHandleRowRootProps,
  tableHandleRowRootEvents,
  type TableHandleRowRootProps as Props,
  type TableHandleRowRootEvents as Events,
} from '@prosekit/web/table-handle'

import { createComponent } from '../create-component'

/**
 * Props for the {@link TableHandleRowRoot} component.
 */
export interface TableHandleRowRootProps extends Partial<Props> {}

/**
 * Events for the {@link TableHandleRowRoot} component.
 */
export interface TableHandleRowRootEvents extends Partial<Events> {}

export const TableHandleRowRoot = createComponent<
  TableHandleRowRootProps,
  TableHandleRowRootEvents
>(
  'prosekit-table-handle-row-root',
  'TableHandleRowRoot',
  Object.keys(tableHandleRowRootProps),
  Object.keys(tableHandleRowRootEvents),
)
