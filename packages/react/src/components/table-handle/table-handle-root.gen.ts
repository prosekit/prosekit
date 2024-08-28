import {
  defaultTableHandleRootProps,
  type TableHandleRootElement,
  type TableHandleRootProps
} from '@prosekit/web/table-handle'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react'

import { createComponent } from '../create-component'

export const TableHandleRoot: ForwardRefExoticComponent<
  Partial<TableHandleRootProps> &
  RefAttributes<TableHandleRootElement> &
  HTMLAttributes<TableHandleRootElement>
> = createComponent<
  TableHandleRootProps, 
  TableHandleRootElement
>(
  'prosekit-table-handle-root',
  'TableHandleRoot',
  defaultTableHandleRootProps,
)
