import {
  type TableHandleRowRootElement,
  type TableHandleRowRootProps as Props,
  type TableHandleRowRootEvents as Events,
  tableHandleRowRootProps,
  tableHandleRowRootEvents,
} from '@prosekit/web/table-handle'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react'

import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

export type TableHandleRowRootProps = CreateProps<Props, Events>
 
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
  Object.keys(tableHandleRowRootProps),
  Object.keys(tableHandleRowRootEvents),
)
