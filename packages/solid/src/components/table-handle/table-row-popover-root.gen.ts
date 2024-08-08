import { 
  defaultTableRowPopoverRootProps,
  type TableRowPopoverRootElement,
  type TableRowPopoverRootProps,
} from '@prosekit/web/table-handle'

import { createComponent } from '../create-component'

export const TableRowPopoverRoot = createComponent<
  TableRowPopoverRootProps,
  TableRowPopoverRootElement
>(
  'prosekit-table-row-popover-root', 
  defaultTableRowPopoverRootProps,
)
