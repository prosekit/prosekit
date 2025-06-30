import {
  type TableHandleDndPreviewElement,
  type TableHandleDndPreviewProps as Props,
  type TableHandleDndPreviewEvents as Events,
  tableHandleDndPreviewProps,
  tableHandleDndPreviewEvents,
} from '@prosekit/web/table-handle'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react'

import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link TableHandleDndPreview} component.
 */
export interface TableHandleDndPreviewProps extends Partial<CreateProps<Props, Events>> {}
 
export const TableHandleDndPreview: ForwardRefExoticComponent<
  TableHandleDndPreviewProps &
  RefAttributes<TableHandleDndPreviewElement> &
  HTMLAttributes<TableHandleDndPreviewElement>
> = createComponent<
  TableHandleDndPreviewProps, 
  TableHandleDndPreviewElement
>(
  'prosekit-table-handle-dnd-preview',
  'TableHandleDndPreview',
  Object.keys(tableHandleDndPreviewProps),
  Object.keys(tableHandleDndPreviewEvents),
)
