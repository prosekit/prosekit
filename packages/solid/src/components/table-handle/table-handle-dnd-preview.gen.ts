import { 
  type TableHandleDndPreviewElement,
  type TableHandleDndPreviewProps as Props,
  type TableHandleDndPreviewEvents as Events,
  tableHandleDndPreviewProps,
  tableHandleDndPreviewEvents,
} from '@prosekit/web/table-handle'
import type { Component } from 'solid-js'

import type { PropsWithElement } from '../../types'
import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link TableHandleDndPreview} component.
 */
export interface TableHandleDndPreviewProps extends Partial<CreateProps<Props, Events>> {}

export const TableHandleDndPreview: Component<PropsWithElement<
  TableHandleDndPreviewProps,
  TableHandleDndPreviewElement
>> = createComponent<
  TableHandleDndPreviewProps,
  TableHandleDndPreviewElement
>(
  'prosekit-table-handle-dnd-preview', 
  Object.keys(tableHandleDndPreviewProps),
  Object.keys(tableHandleDndPreviewEvents),
)
