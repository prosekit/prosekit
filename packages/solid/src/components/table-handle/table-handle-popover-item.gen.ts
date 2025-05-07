import { 
  type TableHandlePopoverItemElement,
  type TableHandlePopoverItemProps as Props,
  type TableHandlePopoverItemEvents as Events,
  tableHandlePopoverItemProps,
  tableHandlePopoverItemEvents,
} from '@prosekit/web/table-handle'
import type { Component } from 'solid-js'

import type { PropsWithElement } from '../../types'
import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link TableHandlePopoverItem} component.
 */
export interface TableHandlePopoverItemProps extends Partial<CreateProps<Props, Events>> {}

export const TableHandlePopoverItem: Component<PropsWithElement<
  TableHandlePopoverItemProps,
  TableHandlePopoverItemElement
>> = createComponent<
  TableHandlePopoverItemProps,
  TableHandlePopoverItemElement
>(
  'prosekit-table-handle-popover-item', 
  Object.keys(tableHandlePopoverItemProps),
  Object.keys(tableHandlePopoverItemEvents),
)
