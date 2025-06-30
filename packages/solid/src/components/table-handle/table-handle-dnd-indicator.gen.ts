import { 
  type TableHandleDndIndicatorElement,
  type TableHandleDndIndicatorProps as Props,
  type TableHandleDndIndicatorEvents as Events,
  tableHandleDndIndicatorProps,
  tableHandleDndIndicatorEvents,
} from '@prosekit/web/table-handle'
import type { Component } from 'solid-js'

import type { PropsWithElement } from '../../types'
import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link TableHandleDndIndicator} component.
 */
export interface TableHandleDndIndicatorProps extends Partial<CreateProps<Props, Events>> {}

export const TableHandleDndIndicator: Component<PropsWithElement<
  TableHandleDndIndicatorProps,
  TableHandleDndIndicatorElement
>> = createComponent<
  TableHandleDndIndicatorProps,
  TableHandleDndIndicatorElement
>(
  'prosekit-table-handle-dnd-indicator', 
  Object.keys(tableHandleDndIndicatorProps),
  Object.keys(tableHandleDndIndicatorEvents),
)
