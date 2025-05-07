import {
  tooltipTriggerProps,
  tooltipTriggerEvents,
  type TooltipTriggerProps as Props,
  type TooltipTriggerEvents as Events,
} from '@prosekit/web/tooltip'
import type { DefineSetupFnComponent, HTMLAttributes } from 'vue'

import { createComponent } from '../create-component'
import type { CreateEmits } from '../create-emits'

/**
 * Props for the {@link TooltipTrigger} component.
 */
export interface TooltipTriggerProps extends Partial<Props> {}

/**
 * Emits for the {@link TooltipTrigger} component.
 */
export interface TooltipTriggerEmits extends CreateEmits<Events> {}

export const TooltipTrigger: DefineSetupFnComponent<
  TooltipTriggerProps & HTMLAttributes,
  TooltipTriggerEmits
> = createComponent<
  TooltipTriggerProps,
  TooltipTriggerEmits
>(
  'prosekit-tooltip-trigger',
  'TooltipTrigger',
  Object.keys(tooltipTriggerProps),
  Object.keys(tooltipTriggerEvents),
)
