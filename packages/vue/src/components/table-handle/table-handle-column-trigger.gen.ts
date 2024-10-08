import {
  tableHandleColumnTriggerProps,
  tableHandleColumnTriggerEvents,
  type TableHandleColumnTriggerProps as Props,
  type TableHandleColumnTriggerEvents as Events,
} from '@prosekit/web/table-handle'

import { createComponent } from '../create-component'
import type { CreateEmits } from '../create-emits'

/**
 * Props for the {@link TableHandleColumnTrigger} component.
 */
export interface TableHandleColumnTriggerProps extends Partial<Props> {}

/**
 * Emits for the {@link TableHandleColumnTrigger} component.
 */
export interface TableHandleColumnTriggerEmits extends CreateEmits<Events> {}

export const TableHandleColumnTrigger: DefineSetupFnComponent<
  TableHandleColumnTriggerProps & HTMLAttributes,
  TableHandleColumnTriggerEmits
> = createComponent<
  TableHandleColumnTriggerProps,
  TableHandleColumnTriggerEmits
>(
  'prosekit-table-handle-column-trigger',
  'TableHandleColumnTrigger',
  Object.keys(tableHandleColumnTriggerProps),
  Object.keys(tableHandleColumnTriggerEvents),
)
