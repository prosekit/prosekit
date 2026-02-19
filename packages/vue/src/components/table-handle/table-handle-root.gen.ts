import {
  tableHandleRootProps,
  tableHandleRootEvents,
  type TableHandleRootProps as Props,
  type TableHandleRootEvents as Events,
} from '@prosekit/web/table-handle'
import type { DefineSetupFnComponent, HTMLAttributes } from 'vue'

import { createComponent } from '../create-component.ts'
import type { CreateEmits } from '../create-emits.ts'

/**
 * Props for the {@link TableHandleRoot} component.
 */
export interface TableHandleRootProps extends Partial<Props> {}

/**
 * Emits for the {@link TableHandleRoot} component.
 */
export interface TableHandleRootEmits extends CreateEmits<Events> {}

export const TableHandleRoot: DefineSetupFnComponent<
  TableHandleRootProps & HTMLAttributes,
  TableHandleRootEmits
> = createComponent<
  TableHandleRootProps,
  TableHandleRootEmits
>(
  'prosekit-table-handle-root',
  'TableHandleRoot',
  Object.keys(tableHandleRootProps),
  Object.keys(tableHandleRootEvents),
)
