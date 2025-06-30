import {
  tableHandleDndIndicatorProps,
  tableHandleDndIndicatorEvents,
  type TableHandleDndIndicatorProps as Props,
  type TableHandleDndIndicatorEvents as Events,
} from '@prosekit/web/table-handle'
import type { DefineSetupFnComponent, HTMLAttributes } from 'vue'

import { createComponent } from '../create-component'
import type { CreateEmits } from '../create-emits'

/**
 * Props for the {@link TableHandleDndIndicator} component.
 */
export interface TableHandleDndIndicatorProps extends Partial<Props> {}

/**
 * Emits for the {@link TableHandleDndIndicator} component.
 */
export interface TableHandleDndIndicatorEmits extends CreateEmits<Events> {}

export const TableHandleDndIndicator: DefineSetupFnComponent<
  TableHandleDndIndicatorProps & HTMLAttributes,
  TableHandleDndIndicatorEmits
> = createComponent<
  TableHandleDndIndicatorProps,
  TableHandleDndIndicatorEmits
>(
  'prosekit-table-handle-dnd-indicator',
  'TableHandleDndIndicator',
  Object.keys(tableHandleDndIndicatorProps),
  Object.keys(tableHandleDndIndicatorEvents),
)
