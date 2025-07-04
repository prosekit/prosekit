import {
  type TableHandleDragIndicatorElement,
  type TableHandleDragIndicatorProps as Props,
  type TableHandleDragIndicatorEvents as Events,
  tableHandleDragIndicatorProps,
  tableHandleDragIndicatorEvents,
} from '@prosekit/web/table-handle'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react'

import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link TableHandleDragIndicator} component.
 */
export interface TableHandleDragIndicatorProps extends Partial<CreateProps<Props, Events>> {}
 
export const TableHandleDragIndicator: ForwardRefExoticComponent<
  TableHandleDragIndicatorProps &
  RefAttributes<TableHandleDragIndicatorElement> &
  HTMLAttributes<TableHandleDragIndicatorElement>
> = createComponent<
  TableHandleDragIndicatorProps, 
  TableHandleDragIndicatorElement
>(
  'prosekit-table-handle-drag-indicator',
  'TableHandleDragIndicator',
  Object.keys(tableHandleDragIndicatorProps),
  Object.keys(tableHandleDragIndicatorEvents),
)
