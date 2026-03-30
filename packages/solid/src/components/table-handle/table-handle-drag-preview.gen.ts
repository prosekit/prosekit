import { 
  type TableHandleDragPreviewElement,
  type TableHandleDragPreviewProps as Props,
  type TableHandleDragPreviewEvents as Events,
  tableHandleDragPreviewProps,
  tableHandleDragPreviewEvents,
} from '@prosekit/web/table-handle'
import type { Component } from 'solid-js'

import type { PropsWithElement } from '../../types.ts'
import { createComponent } from '../create-component.ts'
import type { CreateProps } from '../create-props.ts'

/**
 * Props for the {@link TableHandleDragPreview} component.
 */
export interface TableHandleDragPreviewProps extends Partial<CreateProps<Props, Events>> {}

export const TableHandleDragPreview: Component<PropsWithElement<
  TableHandleDragPreviewProps,
  TableHandleDragPreviewElement
>> = createComponent<
  TableHandleDragPreviewProps,
  TableHandleDragPreviewElement
>(
  'prosekit-table-handle-drag-preview', 
  Object.keys(tableHandleDragPreviewProps),
  Object.keys(tableHandleDragPreviewEvents),
)
