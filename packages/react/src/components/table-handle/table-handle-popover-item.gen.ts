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
} from 'react'

import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

export type TableHandlePopoverItemProps = CreateProps<Props, Events>
 
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
