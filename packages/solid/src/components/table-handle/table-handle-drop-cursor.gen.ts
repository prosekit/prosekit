import { 
  type TableHandleDropCursorElement,
  type TableHandleDropCursorProps as Props,
  type TableHandleDropCursorEvents as Events,
  tableHandleDropCursorProps,
  tableHandleDropCursorEvents,
} from '@prosekit/web/table-handle'
import type { Component } from 'solid-js'

import type { PropsWithElement } from '../../types'
import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link TableHandleDropCursor} component.
 */
export interface TableHandleDropCursorProps extends Partial<CreateProps<Props, Events>> {}

export const TableHandleDropCursor: Component<PropsWithElement<
  TableHandleDropCursorProps,
  TableHandleDropCursorElement
>> = createComponent<
  TableHandleDropCursorProps,
  TableHandleDropCursorElement
>(
  'prosekit-table-handle-drop-cursor', 
  Object.keys(tableHandleDropCursorProps),
  Object.keys(tableHandleDropCursorEvents),
)
