import {
  type TableHandleDragPreviewElement,
  type TableHandleDragPreviewProps as Props,
  type TableHandleDragPreviewEvents as Events,
  tableHandleDragPreviewProps,
  tableHandleDragPreviewEvents,
} from '@prosekit/web/table-handle'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'preact/compat'

import { createComponent } from '../create-component.ts'
import type { CreateProps } from '../create-props.ts'

/**
 * Props for the {@link TableHandleDragPreview} component.
 */
export interface TableHandleDragPreviewProps extends Partial<CreateProps<Props, Events>> {}

export const TableHandleDragPreview: ForwardRefExoticComponent<
  Partial<TableHandleDragPreviewProps> &
  RefAttributes<TableHandleDragPreviewElement> &
  HTMLAttributes<TableHandleDragPreviewElement>
> = createComponent<
  TableHandleDragPreviewProps,
  TableHandleDragPreviewElement
>(
  'prosekit-table-handle-drag-preview',
  'TableHandleDragPreview',
  Object.keys(tableHandleDragPreviewProps),
  Object.keys(tableHandleDragPreviewEvents),
)
