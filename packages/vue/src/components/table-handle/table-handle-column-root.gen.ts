import {
  tableHandleColumnRootProps,
  tableHandleColumnRootEvents,
  type TableHandleColumnRootProps as Props,
  type TableHandleColumnRootEvents as Events,
} from '@prosekit/web/table-handle'

import { createComponent } from '../create-component'

/**
 * Props for the {@link TableHandleColumnRoot} component.
 */
export interface TableHandleColumnRootProps extends Partial<Props> {}

/**
 * Events for the {@link TableHandleColumnRoot} component.
 */
export interface TableHandleColumnRootEvents extends Partial<Events> {}

export const TableHandleColumnRoot = createComponent<
  TableHandleColumnRootProps,
  TableHandleColumnRootEvents
>(
  'prosekit-table-handle-column-root',
  'TableHandleColumnRoot',
  Object.keys(tableHandleColumnRootProps),
  Object.keys(tableHandleColumnRootEvents),
)
