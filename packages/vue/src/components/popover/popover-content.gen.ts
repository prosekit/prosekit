import {
  popoverContentProps,
  popoverContentEvents,
  type PopoverContentProps as Props,
  type PopoverContentEvents as Events,
} from '@prosekit/web/popover'

import { createComponent } from '../create-component'
import type { CreateEmits } from '../create-emits'

/**
 * Props for the {@link PopoverContent} component.
 */
export interface PopoverContentProps extends Partial<Props> {}

/**
 * Emits for the {@link PopoverContent} component.
 */
export interface PopoverContentEmits extends CreateEmits<Events> {}

export const PopoverContent: DefineSetupFnComponent<
  PopoverContentProps & HTMLAttributes,
  PopoverContentEmits
> = createComponent<
  PopoverContentProps,
  PopoverContentEmits
>(
  'prosekit-popover-content',
  'PopoverContent',
  Object.keys(popoverContentProps),
  Object.keys(popoverContentEvents),
)
