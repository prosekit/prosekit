import {
  tableHandleRowTriggerProps,
  tableHandleRowTriggerEvents,
  type TableHandleRowTriggerProps as Props,
  type TableHandleRowTriggerEvents as Events,
} from '@prosekit/web/table-handle'
import type { DefineSetupFnComponent, HTMLAttributes } from 'vue'

import { createComponent } from '../create-component.ts'
import type { CreateEmits } from '../create-emits.ts'

/**
 * Props for the {@link TableHandleRowTrigger} component.
 */
export interface TableHandleRowTriggerProps extends Partial<Props> {}

/**
 * Emits for the {@link TableHandleRowTrigger} component.
 */
export interface TableHandleRowTriggerEmits extends CreateEmits<Events> {}

export const TableHandleRowTrigger: DefineSetupFnComponent<
  TableHandleRowTriggerProps & HTMLAttributes,
  TableHandleRowTriggerEmits
> = createComponent<
  TableHandleRowTriggerProps,
  TableHandleRowTriggerEmits
>(
  'prosekit-table-handle-row-trigger',
  'TableHandleRowTrigger',
  Object.keys(tableHandleRowTriggerProps),
  Object.keys(tableHandleRowTriggerEvents),
)
