import { 
  tableHandleRowRootProps,
  tableHandleRowRootEvents,
  type TableHandleRowRootElement,
  type TableHandleRowRootProps,
} from '@prosekit/web/table-handle'

import { createComponent } from '../create-component'

export const TableHandleRowRoot = createComponent<
  TableHandleRowRootProps,
  TableHandleRowRootElement
>(
  'prosekit-table-handle-row-root', 
  Object.keys(tableHandleRowRootProps),
  Object.keys(tableHandleRowRootEvents),
)
