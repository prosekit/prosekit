import {
  type TableHandleRowTriggerElement,
  type TableHandleRowTriggerProps as Props,
  type TableHandleRowTriggerEvents as Events,
  tableHandleRowTriggerProps,
  tableHandleRowTriggerEvents,
} from '@prosekit/web/table-handle'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'preact/compat'

import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link TableHandleRowTrigger} component.
 */
export interface TableHandleRowTriggerProps extends Partial<CreateProps<Props, Events>> {}
 
export const TableHandleRowTrigger: ForwardRefExoticComponent<
  Partial<TableHandleRowTriggerProps> &
  RefAttributes<TableHandleRowTriggerElement> &
  HTMLAttributes<TableHandleRowTriggerElement>
> = createComponent<
  TableHandleRowTriggerProps, 
  TableHandleRowTriggerElement
>(
  'prosekit-table-handle-row-trigger',
  'TableHandleRowTrigger',
  Object.keys(tableHandleRowTriggerProps),
  Object.keys(tableHandleRowTriggerEvents),
)
