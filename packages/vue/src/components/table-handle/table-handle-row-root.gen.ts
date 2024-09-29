import { tableHandleRowRootProps, tableHandleRowRootEvents, type TableHandleRowRootProps, type TableHandleRowRootEvents } from '@prosekit/web/table-handle'

import { createComponent } from '../create-component'

export const TableHandleRowRoot = createComponent<
  TableHandleRowRootProps,
  TableHandleRowRootEvents
>(
  'prosekit-table-handle-row-root',
  'TableHandleRowRoot',
  Object.keys(tableHandleRowRootProps),
  Object.keys(tableHandleRowRootEvents),
)
