import {
  popoverContentProps,
  popoverContentEvents,
  type PopoverContentProps as Props,
  type PopoverContentEvents as Events,
} from '@prosekit/web/popover'
import type { DefineSetupFnComponent, HTMLAttributes } from 'vue'

import { createComponent } from '../create-component.ts'
import type { CreateEmits } from '../create-emits.ts'

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
