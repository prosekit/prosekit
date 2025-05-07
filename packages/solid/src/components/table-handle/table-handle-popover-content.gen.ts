import { 
  type TableHandlePopoverContentElement,
  type TableHandlePopoverContentProps as Props,
  type TableHandlePopoverContentEvents as Events,
  tableHandlePopoverContentProps,
  tableHandlePopoverContentEvents,
} from '@prosekit/web/table-handle'
import type { Component } from 'solid-js'

import type { PropsWithElement } from '../../types'
import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link TableHandlePopoverContent} component.
 */
export interface TableHandlePopoverContentProps extends Partial<CreateProps<Props, Events>> {}

export const TableHandlePopoverContent: Component<PropsWithElement<
  TableHandlePopoverContentProps,
  TableHandlePopoverContentElement
>> = createComponent<
  TableHandlePopoverContentProps,
  TableHandlePopoverContentElement
>(
  'prosekit-table-handle-popover-content', 
  Object.keys(tableHandlePopoverContentProps),
  Object.keys(tableHandlePopoverContentEvents),
)
