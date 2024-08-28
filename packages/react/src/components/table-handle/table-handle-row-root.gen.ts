import {
  defaultTableHandleRowRootProps,
  type TableHandleRowRootElement,
  type TableHandleRowRootProps
} from '@prosekit/web/table-handle'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react'

import { createComponent } from '../create-component'

export const TableHandleRowRoot: ForwardRefExoticComponent<
  Partial<TableHandleRowRootProps> &
  RefAttributes<TableHandleRowRootElement> &
  HTMLAttributes<TableHandleRowRootElement>
> = createComponent<
  TableHandleRowRootProps, 
  TableHandleRowRootElement
>(
  'prosekit-table-handle-row-root',
  'TableHandleRowRoot',
  defaultTableHandleRowRootProps,
)
