import {
  tableHandleDropCursorProps,
  tableHandleDropCursorEvents,
  type TableHandleDropCursorProps as Props,
  type TableHandleDropCursorEvents as Events,
} from '@prosekit/web/table-handle'
import type { DefineSetupFnComponent, HTMLAttributes } from 'vue'

import { createComponent } from '../create-component'
import type { CreateEmits } from '../create-emits'

/**
 * Props for the {@link TableHandleDropCursor} component.
 */
export interface TableHandleDropCursorProps extends Partial<Props> {}

/**
 * Emits for the {@link TableHandleDropCursor} component.
 */
export interface TableHandleDropCursorEmits extends CreateEmits<Events> {}

export const TableHandleDropCursor: DefineSetupFnComponent<
  TableHandleDropCursorProps & HTMLAttributes,
  TableHandleDropCursorEmits
> = createComponent<
  TableHandleDropCursorProps,
  TableHandleDropCursorEmits
>(
  'prosekit-table-handle-drop-cursor',
  'TableHandleDropCursor',
  Object.keys(tableHandleDropCursorProps),
  Object.keys(tableHandleDropCursorEvents),
)
