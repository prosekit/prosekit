import {
  popoverRootProps,
  popoverRootEvents,
  type PopoverRootProps as Props,
  type PopoverRootEvents as Events,
} from '@prosekit/web/popover'
import type { DefineSetupFnComponent, HTMLAttributes } from 'vue'

import { createComponent } from '../create-component.ts'
import type { CreateEmits } from '../create-emits.ts'

/**
 * Props for the {@link PopoverRoot} component.
 */
export interface PopoverRootProps extends Partial<Props> {}

/**
 * Emits for the {@link PopoverRoot} component.
 */
export interface PopoverRootEmits extends CreateEmits<Events> {}

export const PopoverRoot: DefineSetupFnComponent<
  PopoverRootProps & HTMLAttributes,
  PopoverRootEmits
> = createComponent<
  PopoverRootProps,
  PopoverRootEmits
>(
  'prosekit-popover-root',
  'PopoverRoot',
  Object.keys(popoverRootProps),
  Object.keys(popoverRootEvents),
)
