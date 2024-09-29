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

import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

export type TableHandleColumnTriggerProps = CreateProps<Props, Events>
 
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
