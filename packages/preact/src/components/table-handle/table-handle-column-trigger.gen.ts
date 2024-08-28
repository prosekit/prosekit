import {
  defaultTableHandleColumnTriggerProps,
  type TableHandleColumnTriggerElement,
  type TableHandleColumnTriggerProps,
} from '@prosekit/web/table-handle'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'preact/compat'

import { createComponent } from '../create-component'

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
  defaultTableHandleColumnTriggerProps,
)
