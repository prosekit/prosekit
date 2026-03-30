import {
  tableHandlePopoverContentProps,
  tableHandlePopoverContentEvents,
  type TableHandlePopoverContentProps as Props,
  type TableHandlePopoverContentEvents as Events,
} from '@prosekit/web/table-handle'
import type { DefineSetupFnComponent, HTMLAttributes } from 'vue'

import { createComponent } from '../create-component.ts'
import type { CreateEmits } from '../create-emits.ts'

/**
 * Props for the {@link TableHandlePopoverContent} component.
 */
export interface TableHandlePopoverContentProps extends Partial<Props> {}

/**
 * Emits for the {@link TableHandlePopoverContent} component.
 */
export interface TableHandlePopoverContentEmits extends CreateEmits<Events> {}

export const TableHandlePopoverContent: DefineSetupFnComponent<
  TableHandlePopoverContentProps & HTMLAttributes,
  TableHandlePopoverContentEmits
> = createComponent<
  TableHandlePopoverContentProps,
  TableHandlePopoverContentEmits
>(
  'prosekit-table-handle-popover-content',
  'TableHandlePopoverContent',
  Object.keys(tableHandlePopoverContentProps),
  Object.keys(tableHandlePopoverContentEvents),
)
