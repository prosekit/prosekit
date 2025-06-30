import {
  tableHandleDndPreviewProps,
  tableHandleDndPreviewEvents,
  type TableHandleDndPreviewProps as Props,
  type TableHandleDndPreviewEvents as Events,
} from '@prosekit/web/table-handle'
import type { DefineSetupFnComponent, HTMLAttributes } from 'vue'

import { createComponent } from '../create-component'
import type { CreateEmits } from '../create-emits'

/**
 * Props for the {@link TableHandleDndPreview} component.
 */
export interface TableHandleDndPreviewProps extends Partial<Props> {}

/**
 * Emits for the {@link TableHandleDndPreview} component.
 */
export interface TableHandleDndPreviewEmits extends CreateEmits<Events> {}

export const TableHandleDndPreview: DefineSetupFnComponent<
  TableHandleDndPreviewProps & HTMLAttributes,
  TableHandleDndPreviewEmits
> = createComponent<
  TableHandleDndPreviewProps,
  TableHandleDndPreviewEmits
>(
  'prosekit-table-handle-dnd-preview',
  'TableHandleDndPreview',
  Object.keys(tableHandleDndPreviewProps),
  Object.keys(tableHandleDndPreviewEvents),
)
