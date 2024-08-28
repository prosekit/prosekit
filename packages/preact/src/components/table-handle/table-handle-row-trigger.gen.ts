import {
  defaultTableHandleRowTriggerProps,
  type TableHandleRowTriggerElement,
  type TableHandleRowTriggerProps,
} from '@prosekit/web/table-handle'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'preact/compat'

import { createComponent } from '../create-component'

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
  defaultTableHandleRowTriggerProps,
)
