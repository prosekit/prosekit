import {
  tableHandleRootProps,
  tableHandleRootEvents,
  type TableHandleRootProps as Props,
  type TableHandleRootEvents as Events,
} from '@prosekit/web/table-handle'

import { createComponent } from '../create-component'

/**
 * Props for the {@link TableHandleRoot} component.
 */
export interface TableHandleRootProps extends Partial<Props> {}

/**
 * Events for the {@link TableHandleRoot} component.
 */
export interface TableHandleRootEvents extends Partial<Events> {}

export const TableHandleRoot = createComponent<
  TableHandleRootProps,
  TableHandleRootEvents
>(
  'prosekit-table-handle-root',
  'TableHandleRoot',
  Object.keys(tableHandleRootProps),
  Object.keys(tableHandleRootEvents),
)
