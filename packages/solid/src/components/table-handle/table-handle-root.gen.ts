import { 
  tableHandleRootProps,
  tableHandleRootEvents,
  type TableHandleRootElement,
  type TableHandleRootProps,
} from '@prosekit/web/table-handle'

import { createComponent } from '../create-component'

export const TableHandleRoot = createComponent<
  TableHandleRootProps,
  TableHandleRootElement
>(
  'prosekit-table-handle-root', 
  Object.keys(tableHandleRootProps),
  Object.keys(tableHandleRootEvents),
)
