import {
  type TableHandleDndIndicatorElement,
  type TableHandleDndIndicatorProps as Props,
  type TableHandleDndIndicatorEvents as Events,
  tableHandleDndIndicatorProps,
  tableHandleDndIndicatorEvents,
} from '@prosekit/web/table-handle'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react'

import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link TableHandleDndIndicator} component.
 */
export interface TableHandleDndIndicatorProps extends Partial<CreateProps<Props, Events>> {}
 
export const TableHandleDndIndicator: ForwardRefExoticComponent<
  TableHandleDndIndicatorProps &
  RefAttributes<TableHandleDndIndicatorElement> &
  HTMLAttributes<TableHandleDndIndicatorElement>
> = createComponent<
  TableHandleDndIndicatorProps, 
  TableHandleDndIndicatorElement
>(
  'prosekit-table-handle-dnd-indicator',
  'TableHandleDndIndicator',
  Object.keys(tableHandleDndIndicatorProps),
  Object.keys(tableHandleDndIndicatorEvents),
)
