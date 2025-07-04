import {
  tableHandleDropIndicatorProps,
  tableHandleDropIndicatorEvents,
  type TableHandleDropIndicatorProps as Props,
  type TableHandleDropIndicatorEvents as Events,
} from '@prosekit/web/table-handle'
import type { DefineSetupFnComponent, HTMLAttributes } from 'vue'

import { createComponent } from '../create-component'
import type { CreateEmits } from '../create-emits'

/**
 * Props for the {@link TableHandleDropIndicator} component.
 */
export interface TableHandleDropIndicatorProps extends Partial<Props> {}

/**
 * Emits for the {@link TableHandleDropIndicator} component.
 */
export interface TableHandleDropIndicatorEmits extends CreateEmits<Events> {}

export const TableHandleDropIndicator: DefineSetupFnComponent<
  TableHandleDropIndicatorProps & HTMLAttributes,
  TableHandleDropIndicatorEmits
> = createComponent<
  TableHandleDropIndicatorProps,
  TableHandleDropIndicatorEmits
>(
  'prosekit-table-handle-drop-indicator',
  'TableHandleDropIndicator',
  Object.keys(tableHandleDropIndicatorProps),
  Object.keys(tableHandleDropIndicatorEvents),
)
