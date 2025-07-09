import { 
  type TableHandleDropIndicatorElement,
  type TableHandleDropIndicatorProps as Props,
  type TableHandleDropIndicatorEvents as Events,
  tableHandleDropIndicatorProps,
  tableHandleDropIndicatorEvents,
} from '@prosekit/web/table-handle'
import type { Component } from 'solid-js'

import type { PropsWithElement } from '../../types'
import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link TableHandleDropIndicator} component.
 */
export interface TableHandleDropIndicatorProps extends Partial<CreateProps<Props, Events>> {}

export const TableHandleDropIndicator: Component<PropsWithElement<
  TableHandleDropIndicatorProps,
  TableHandleDropIndicatorElement
>> = createComponent<
  TableHandleDropIndicatorProps,
  TableHandleDropIndicatorElement
>(
  'prosekit-table-handle-drop-indicator', 
  Object.keys(tableHandleDropIndicatorProps),
  Object.keys(tableHandleDropIndicatorEvents),
)
