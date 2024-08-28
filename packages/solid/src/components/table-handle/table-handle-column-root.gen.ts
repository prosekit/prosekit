import { 
  defaultTableHandleColumnRootProps,
  type TableHandleColumnRootElement,
  type TableHandleColumnRootProps,
} from '@prosekit/web/table-handle'

import { createComponent } from '../create-component'

export const TableHandleColumnRoot = createComponent<
  TableHandleColumnRootProps,
  TableHandleColumnRootElement
>(
  'prosekit-table-handle-column-root', 
  defaultTableHandleColumnRootProps,
)
