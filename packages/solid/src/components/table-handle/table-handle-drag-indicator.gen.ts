import { 
  type TableHandleDragIndicatorElement,
  type TableHandleDragIndicatorProps as Props,
  type TableHandleDragIndicatorEvents as Events,
  tableHandleDragIndicatorProps,
  tableHandleDragIndicatorEvents,
} from '@prosekit/web/table-handle'
import type { Component } from 'solid-js'

import type { PropsWithElement } from '../../types'
import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link TableHandleDragIndicator} component.
 */
export interface TableHandleDragIndicatorProps extends Partial<CreateProps<Props, Events>> {}

export const TableHandleDragIndicator: Component<PropsWithElement<
  TableHandleDragIndicatorProps,
  TableHandleDragIndicatorElement
>> = createComponent<
  TableHandleDragIndicatorProps,
  TableHandleDragIndicatorElement
>(
  'prosekit-table-handle-drag-indicator', 
  Object.keys(tableHandleDragIndicatorProps),
  Object.keys(tableHandleDragIndicatorEvents),
)
