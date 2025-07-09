import {
  type TableHandleDropIndicatorElement,
  type TableHandleDropIndicatorProps as Props,
  type TableHandleDropIndicatorEvents as Events,
  tableHandleDropIndicatorProps,
  tableHandleDropIndicatorEvents,
} from '@prosekit/web/table-handle'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'preact/compat'

import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link TableHandleDropIndicator} component.
 */
export interface TableHandleDropIndicatorProps extends Partial<CreateProps<Props, Events>> {}
 
export const TableHandleDropIndicator: ForwardRefExoticComponent<
  Partial<TableHandleDropIndicatorProps> &
  RefAttributes<TableHandleDropIndicatorElement> &
  HTMLAttributes<TableHandleDropIndicatorElement>
> = createComponent<
  TableHandleDropIndicatorProps, 
  TableHandleDropIndicatorElement
>(
  'prosekit-table-handle-drop-indicator',
  'TableHandleDropIndicator',
  Object.keys(tableHandleDropIndicatorProps),
  Object.keys(tableHandleDropIndicatorEvents),
)
