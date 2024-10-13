import { 
  type TableHandleRootElement,
  type TableHandleRootProps as Props,
  type TableHandleRootEvents as Events,
  tableHandleRootProps,
  tableHandleRootEvents,
} from '@prosekit/web/table-handle'

import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link TableHandleRoot} component.
 */
export interface TableHandleRootProps extends Partial<CreateProps<Props, Events>> {}

export const TableHandleRoot = createComponent<
  TableHandleRootProps,
  TableHandleRootElement
>(
  'prosekit-table-handle-root', 
  Object.keys(tableHandleRootProps),
  Object.keys(tableHandleRootEvents),
)
