import {
  tableHandleColumnRootProps,
  tableHandleColumnRootEvents,
  type TableHandleColumnRootProps as Props,
  type TableHandleColumnRootEvents as Events,
} from '@prosekit/web/table-handle'

import { createComponent } from '../create-component'
import type { CreateEmits } from '../create-emits'

/**
 * Props for the {@link TableHandleColumnRoot} component.
 */
export interface TableHandleColumnRootProps extends Partial<Props> {}

/**
 * Emits for the {@link TableHandleColumnRoot} component.
 */
export interface TableHandleColumnRootEmits extends CreateEmits<Events> {}

export const TableHandleColumnRoot: DefineSetupFnComponent<
  TableHandleColumnRootProps & HTMLAttributes,
  TableHandleColumnRootEmits
> = createComponent<
  TableHandleColumnRootProps,
  TableHandleColumnRootEmits
>(
  'prosekit-table-handle-column-root',
  'TableHandleColumnRoot',
  Object.keys(tableHandleColumnRootProps),
  Object.keys(tableHandleColumnRootEvents),
)
