import { 
  type TableHandleRowRootElement,
  type TableHandleRowRootProps as Props,
  type TableHandleRowRootEvents as Events,
  tableHandleRowRootProps,
  tableHandleRowRootEvents,
} from '@prosekit/web/table-handle'
import type { Component } from 'solid-js'

import type { PropsWithElement } from '../../types'
import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link TableHandleRowRoot} component.
 */
export interface TableHandleRowRootProps extends Partial<CreateProps<Props, Events>> {}

export const TableHandleRowRoot: Component<PropsWithElement<
  TableHandleRowRootProps,
  TableHandleRowRootElement
>> = createComponent<
  TableHandleRowRootProps,
  TableHandleRowRootElement
>(
  'prosekit-table-handle-row-root', 
  Object.keys(tableHandleRowRootProps),
  Object.keys(tableHandleRowRootEvents),
)
