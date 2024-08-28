import { 
  defaultTableHandleRowRootProps,
  type TableHandleRowRootElement,
  type TableHandleRowRootProps,
} from '@prosekit/web/table-handle'

import { createComponent } from '../create-component'

export const TableHandleRowRoot = createComponent<
  TableHandleRowRootProps,
  TableHandleRowRootElement
>(
  'prosekit-table-handle-row-root', 
  defaultTableHandleRowRootProps,
)
