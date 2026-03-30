import {
  tableHandlePopoverItemProps,
  tableHandlePopoverItemEvents,
  type TableHandlePopoverItemProps as Props,
  type TableHandlePopoverItemEvents as Events,
} from '@prosekit/web/table-handle'
import type { DefineSetupFnComponent, HTMLAttributes } from 'vue'

import { createComponent } from '../create-component.ts'
import type { CreateEmits } from '../create-emits.ts'

/**
 * Props for the {@link TableHandlePopoverItem} component.
 */
export interface TableHandlePopoverItemProps extends Partial<Props> {}

/**
 * Emits for the {@link TableHandlePopoverItem} component.
 */
export interface TableHandlePopoverItemEmits extends CreateEmits<Events> {}

export const TableHandlePopoverItem: DefineSetupFnComponent<
  TableHandlePopoverItemProps & HTMLAttributes,
  TableHandlePopoverItemEmits
> = createComponent<
  TableHandlePopoverItemProps,
  TableHandlePopoverItemEmits
>(
  'prosekit-table-handle-popover-item',
  'TableHandlePopoverItem',
  Object.keys(tableHandlePopoverItemProps),
  Object.keys(tableHandlePopoverItemEvents),
)
