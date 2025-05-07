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

/**
 * Props for the {@link TableHandleRowRoot} component.
 */
export interface TableHandleRowRootProps extends Partial<CreateProps<Props, Events>> {}
 
export const TableHandleRowRoot: ForwardRefExoticComponent<
  TableHandleRowRootProps &
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
