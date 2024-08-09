import { 
  TableColumnPopoverRootElement,
  defaultTableColumnPopoverRootProps,
  type TableColumnPopoverRootProps,
} from '@prosekit/web/table-handle'

import { createComponent } from '../create-component'

export const TableColumnPopoverRoot = createComponent<
  TableColumnPopoverRootProps,
  TableColumnPopoverRootElement
>(
  'prosekit-table-column-popover-root', 
  defaultTableColumnPopoverRootProps,
)
