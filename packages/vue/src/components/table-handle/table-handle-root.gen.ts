import { tableHandleRootProps, tableHandleRootEvents, type TableHandleRootProps, type TableHandleRootEvents } from '@prosekit/web/table-handle'

import { createComponent } from '../create-component'

export const TableHandleRoot = createComponent<
  TableHandleRootProps,
  TableHandleRootEvents
>(
  'prosekit-table-handle-root',
  'TableHandleRoot',
  Object.keys(tableHandleRootProps),
  Object.keys(tableHandleRootEvents),
)
