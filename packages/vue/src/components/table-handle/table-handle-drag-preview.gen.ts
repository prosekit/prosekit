import {
  tableHandleDragPreviewProps,
  tableHandleDragPreviewEvents,
  type TableHandleDragPreviewProps as Props,
  type TableHandleDragPreviewEvents as Events,
} from '@prosekit/web/table-handle'
import type { DefineSetupFnComponent, HTMLAttributes } from 'vue'

import { createComponent } from '../create-component.ts'
import type { CreateEmits } from '../create-emits.ts'

/**
 * Props for the {@link TableHandleDragPreview} component.
 */
export interface TableHandleDragPreviewProps extends Partial<Props> {}

/**
 * Emits for the {@link TableHandleDragPreview} component.
 */
export interface TableHandleDragPreviewEmits extends CreateEmits<Events> {}

export const TableHandleDragPreview: DefineSetupFnComponent<
  TableHandleDragPreviewProps & HTMLAttributes,
  TableHandleDragPreviewEmits
> = createComponent<
  TableHandleDragPreviewProps,
  TableHandleDragPreviewEmits
>(
  'prosekit-table-handle-drag-preview',
  'TableHandleDragPreview',
  Object.keys(tableHandleDragPreviewProps),
  Object.keys(tableHandleDragPreviewEvents),
)
