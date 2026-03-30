import {
  tableHandleRowRootProps,
  tableHandleRowRootEvents,
  type TableHandleRowRootProps as Props,
  type TableHandleRowRootEvents as Events,
} from '@prosekit/web/table-handle'
import type { DefineSetupFnComponent, HTMLAttributes } from 'vue'

import { createComponent } from '../create-component.ts'
import type { CreateEmits } from '../create-emits.ts'

/**
 * Props for the {@link TableHandleRowRoot} component.
 */
export interface TableHandleRowRootProps extends Partial<Props> {}

/**
 * Emits for the {@link TableHandleRowRoot} component.
 */
export interface TableHandleRowRootEmits extends CreateEmits<Events> {}

export const TableHandleRowRoot: DefineSetupFnComponent<
  TableHandleRowRootProps & HTMLAttributes,
  TableHandleRowRootEmits
> = createComponent<
  TableHandleRowRootProps,
  TableHandleRowRootEmits
>(
  'prosekit-table-handle-row-root',
  'TableHandleRowRoot',
  Object.keys(tableHandleRowRootProps),
  Object.keys(tableHandleRowRootEvents),
)
