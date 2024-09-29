import {
  type TableHandleColumnRootElement,
  type TableHandleColumnRootProps as Props,
  type TableHandleColumnRootEvents as Events,
  tableHandleColumnRootProps,
  tableHandleColumnRootEvents,
} from '@prosekit/web/table-handle'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react'

import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

export type TableHandleColumnRootProps = CreateProps<Props, Events>
 
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
  Object.keys(tableHandleColumnRootProps),
  Object.keys(tableHandleColumnRootEvents),
)
