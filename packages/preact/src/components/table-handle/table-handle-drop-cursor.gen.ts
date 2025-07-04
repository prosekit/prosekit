import {
  type TableHandleDropCursorElement,
  type TableHandleDropCursorProps as Props,
  type TableHandleDropCursorEvents as Events,
  tableHandleDropCursorProps,
  tableHandleDropCursorEvents,
} from '@prosekit/web/table-handle'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'preact/compat'

import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link TableHandleDropCursor} component.
 */
export interface TableHandleDropCursorProps extends Partial<CreateProps<Props, Events>> {}
 
export const TableHandleDropCursor: ForwardRefExoticComponent<
  Partial<TableHandleDropCursorProps> &
  RefAttributes<TableHandleDropCursorElement> &
  HTMLAttributes<TableHandleDropCursorElement>
> = createComponent<
  TableHandleDropCursorProps, 
  TableHandleDropCursorElement
>(
  'prosekit-table-handle-drop-cursor',
  'TableHandleDropCursor',
  Object.keys(tableHandleDropCursorProps),
  Object.keys(tableHandleDropCursorEvents),
)
