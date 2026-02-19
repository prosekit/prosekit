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
} from 'preact/compat'

import { createComponent } from '../create-component.ts'
import type { CreateProps } from '../create-props.ts'

/**
 * Props for the {@link TableHandleColumnRoot} component.
 */
export interface TableHandleColumnRootProps extends Partial<CreateProps<Props, Events>> {}

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
