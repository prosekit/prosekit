import { 
  type TableHandleColumnRootElement,
  type TableHandleColumnRootProps as Props,
  type TableHandleColumnRootEvents as Events,
  tableHandleColumnRootProps,
  tableHandleColumnRootEvents,
} from '@prosekit/web/table-handle'
import type { Component } from 'solid-js'

import type { PropsWithElement } from '../../types'
import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link TableHandleColumnRoot} component.
 */
export interface TableHandleColumnRootProps extends Partial<CreateProps<Props, Events>> {}

export const TableHandleColumnRoot: Component<PropsWithElement<
  TableHandleColumnRootProps,
  TableHandleColumnRootElement
>> = createComponent<
  TableHandleColumnRootProps,
  TableHandleColumnRootElement
>(
  'prosekit-table-handle-column-root', 
  Object.keys(tableHandleColumnRootProps),
  Object.keys(tableHandleColumnRootEvents),
)
