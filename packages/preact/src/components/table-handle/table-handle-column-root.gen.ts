import {
  defaultTableHandleColumnRootProps,
  type TableHandleColumnRootElement,
  type TableHandleColumnRootProps,
} from '@prosekit/web/table-handle'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'preact/compat'

import { createComponent } from '../create-component'

export const TableHandleColumnRoot: ForwardRefExoticComponent<
  Partial<TableHandleColumnRootProps> &
  RefAttributes<TableHandleColumnRootElement> &
  HTMLAttributes<TableHandleColumnRootElement>
> = createComponent<
  TableHandleColumnRootProps, 
  TableHandleColumnRootElement
>(
  'prosekit-table-handle-column-root',
  'TableHandleColumnRoot',
  defaultTableHandleColumnRootProps,
)
