import {
  type TableHandleRootElement,
  type TableHandleRootProps as Props,
  type TableHandleRootEvents as Events,
  tableHandleRootProps,
  tableHandleRootEvents,
} from '@prosekit/web/table-handle'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react'

import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link TableHandleRoot} component.
 */
export interface TableHandleRootProps extends Partial<CreateProps<Props, Events>> {}
 
export const TableHandleRoot: ForwardRefExoticComponent<
  TableHandleRootProps &
  RefAttributes<TableHandleRootElement> &
  HTMLAttributes<TableHandleRootElement>
> = createComponent<
  TableHandleRootProps, 
  TableHandleRootElement
>(
  'prosekit-table-handle-root',
  'TableHandleRoot',
  Object.keys(tableHandleRootProps),
  Object.keys(tableHandleRootEvents),
)
