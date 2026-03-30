import {
  popoverTriggerProps,
  popoverTriggerEvents,
  type PopoverTriggerProps as Props,
  type PopoverTriggerEvents as Events,
} from '@prosekit/web/popover'
import type { DefineSetupFnComponent, HTMLAttributes } from 'vue'

import { createComponent } from '../create-component.ts'
import type { CreateEmits } from '../create-emits.ts'

/**
 * Props for the {@link PopoverTrigger} component.
 */
export interface PopoverTriggerProps extends Partial<Props> {}

/**
 * Emits for the {@link PopoverTrigger} component.
 */
export interface PopoverTriggerEmits extends CreateEmits<Events> {}

export const PopoverTrigger: DefineSetupFnComponent<
  PopoverTriggerProps & HTMLAttributes,
  PopoverTriggerEmits
> = createComponent<
  PopoverTriggerProps,
  PopoverTriggerEmits
>(
  'prosekit-popover-trigger',
  'PopoverTrigger',
  Object.keys(popoverTriggerProps),
  Object.keys(popoverTriggerEvents),
)
