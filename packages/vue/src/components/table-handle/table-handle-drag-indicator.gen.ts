import {
  tableHandleDragIndicatorProps,
  tableHandleDragIndicatorEvents,
  type TableHandleDragIndicatorProps as Props,
  type TableHandleDragIndicatorEvents as Events,
} from '@prosekit/web/table-handle'
import type { DefineSetupFnComponent, HTMLAttributes } from 'vue'

import { createComponent } from '../create-component'
import type { CreateEmits } from '../create-emits'

/**
 * Props for the {@link TableHandleDragIndicator} component.
 */
export interface TableHandleDragIndicatorProps extends Partial<Props> {}

/**
 * Emits for the {@link TableHandleDragIndicator} component.
 */
export interface TableHandleDragIndicatorEmits extends CreateEmits<Events> {}

export const TableHandleDragIndicator: DefineSetupFnComponent<
  TableHandleDragIndicatorProps & HTMLAttributes,
  TableHandleDragIndicatorEmits
> = createComponent<
  TableHandleDragIndicatorProps,
  TableHandleDragIndicatorEmits
>(
  'prosekit-table-handle-drag-indicator',
  'TableHandleDragIndicator',
  Object.keys(tableHandleDragIndicatorProps),
  Object.keys(tableHandleDragIndicatorEvents),
)
