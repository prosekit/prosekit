import { 
  type TableHandleRootElement,
  type TableHandleRootProps as Props,
  type TableHandleRootEvents as Events,
  tableHandleRootProps,
  tableHandleRootEvents,
} from '@prosekit/web/table-handle'
import type { Component } from 'solid-js'

import type { PropsWithElement } from '../../types'
import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link TableHandleRoot} component.
 */
export interface TableHandleRootProps extends Partial<CreateProps<Props, Events>> {}

export const TableHandleRoot: Component<PropsWithElement<
  TableHandleRootProps,
  TableHandleRootElement
>> = createComponent<
  TableHandleRootProps,
  TableHandleRootElement
>(
  'prosekit-table-handle-root', 
  Object.keys(tableHandleRootProps),
  Object.keys(tableHandleRootEvents),
)
