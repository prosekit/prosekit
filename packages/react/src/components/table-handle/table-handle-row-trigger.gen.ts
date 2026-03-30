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
} from 'react'

import { createComponent } from '../create-component.ts'
import type { CreateProps } from '../create-props.ts'

/**
 * Props for the {@link TableHandleRowTrigger} component.
 */
export interface TableHandleRowTriggerProps extends Partial<CreateProps<Props, Events>> {}

export const TableHandleRowTrigger: ForwardRefExoticComponent<
  TableHandleRowTriggerProps &
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
