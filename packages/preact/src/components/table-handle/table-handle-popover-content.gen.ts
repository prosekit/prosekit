import {
  type TableHandlePopoverContentElement,
  type TableHandlePopoverContentProps as Props,
  type TableHandlePopoverContentEvents as Events,
  tableHandlePopoverContentProps,
  tableHandlePopoverContentEvents,
} from '@prosekit/web/table-handle'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'preact/compat'

import { createComponent } from '../create-component.ts'
import type { CreateProps } from '../create-props.ts'

/**
 * Props for the {@link TableHandlePopoverContent} component.
 */
export interface TableHandlePopoverContentProps extends Partial<CreateProps<Props, Events>> {}

export const TableHandlePopoverContent: ForwardRefExoticComponent<
  Partial<TableHandlePopoverContentProps> &
  RefAttributes<TableHandlePopoverContentElement> &
  HTMLAttributes<TableHandlePopoverContentElement>
> = createComponent<
  TableHandlePopoverContentProps,
  TableHandlePopoverContentElement
>(
  'prosekit-table-handle-popover-content',
  'TableHandlePopoverContent',
  Object.keys(tableHandlePopoverContentProps),
  Object.keys(tableHandlePopoverContentEvents),
)
