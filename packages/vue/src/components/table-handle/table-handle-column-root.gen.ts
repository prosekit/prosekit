import { tableHandleColumnRootProps, tableHandleColumnRootEvents, type TableHandleColumnRootProps, type TableHandleColumnRootEvents } from '@prosekit/web/table-handle'

import { createComponent } from '../create-component'

export const TableHandleColumnRoot = createComponent<
  TableHandleColumnRootProps,
  TableHandleColumnRootEvents
>(
  'prosekit-table-handle-column-root',
  'TableHandleColumnRoot',
  Object.keys(tableHandleColumnRootProps),
  Object.keys(tableHandleColumnRootEvents),
)
