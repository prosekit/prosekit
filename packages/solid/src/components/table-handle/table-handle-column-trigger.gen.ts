import { 
  type TableHandleColumnTriggerElement,
  type TableHandleColumnTriggerProps as Props,
  type TableHandleColumnTriggerEvents as Events,
  tableHandleColumnTriggerProps,
  tableHandleColumnTriggerEvents,
} from '@prosekit/web/table-handle'
import type { Component } from 'solid-js'

import type { PropsWithElement } from '../../types'
import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link TableHandleColumnTrigger} component.
 */
export interface TableHandleColumnTriggerProps extends Partial<CreateProps<Props, Events>> {}

export const TableHandleColumnTrigger: Component<PropsWithElement<
  TableHandleColumnTriggerProps,
  TableHandleColumnTriggerElement
>> = createComponent<
  TableHandleColumnTriggerProps,
  TableHandleColumnTriggerElement
>(
  'prosekit-table-handle-column-trigger', 
  Object.keys(tableHandleColumnTriggerProps),
  Object.keys(tableHandleColumnTriggerEvents),
)
