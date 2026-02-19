import {
  type TableHandleColumnTriggerElement,
  type TableHandleColumnTriggerProps as Props,
  type TableHandleColumnTriggerEvents as Events,
  tableHandleColumnTriggerProps,
  tableHandleColumnTriggerEvents,
} from '@prosekit/web/table-handle'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'preact/compat'

import { createComponent } from '../create-component.ts'
import type { CreateProps } from '../create-props.ts'

/**
 * Props for the {@link TableHandleColumnTrigger} component.
 */
export interface TableHandleColumnTriggerProps extends Partial<CreateProps<Props, Events>> {}

export const TableHandleColumnTrigger: ForwardRefExoticComponent<
  Partial<TableHandleColumnTriggerProps> &
  RefAttributes<TableHandleColumnTriggerElement> &
  HTMLAttributes<TableHandleColumnTriggerElement>
> = createComponent<
  TableHandleColumnTriggerProps,
  TableHandleColumnTriggerElement
>(
  'prosekit-table-handle-column-trigger',
  'TableHandleColumnTrigger',
  Object.keys(tableHandleColumnTriggerProps),
  Object.keys(tableHandleColumnTriggerEvents),
)
