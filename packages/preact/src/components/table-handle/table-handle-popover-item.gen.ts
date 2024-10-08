import {
  type TableHandlePopoverItemElement,
  type TableHandlePopoverItemProps as Props,
  type TableHandlePopoverItemEvents as Events,
  tableHandlePopoverItemProps,
  tableHandlePopoverItemEvents,
} from '@prosekit/web/table-handle'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'preact/compat'

import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link TableHandlePopoverItem} component.
 */
export type TableHandlePopoverItemProps = Partial<CreateProps<Props, Events>>
 
export const TableHandlePopoverItem: ForwardRefExoticComponent<
  Partial<TableHandlePopoverItemProps> &
  RefAttributes<TableHandlePopoverItemElement> &
  HTMLAttributes<TableHandlePopoverItemElement>
> = createComponent<
  TableHandlePopoverItemProps, 
  TableHandlePopoverItemElement
>(
  'prosekit-table-handle-popover-item',
  'TableHandlePopoverItem',
  Object.keys(tableHandlePopoverItemProps),
  Object.keys(tableHandlePopoverItemEvents),
)
