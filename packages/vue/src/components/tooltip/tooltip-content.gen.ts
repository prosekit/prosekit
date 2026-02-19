import {
  tooltipContentProps,
  tooltipContentEvents,
  type TooltipContentProps as Props,
  type TooltipContentEvents as Events,
} from '@prosekit/web/tooltip'
import type { DefineSetupFnComponent, HTMLAttributes } from 'vue'

import { createComponent } from '../create-component.ts'
import type { CreateEmits } from '../create-emits.ts'

/**
 * Props for the {@link TooltipContent} component.
 */
export interface TooltipContentProps extends Partial<Props> {}

/**
 * Emits for the {@link TooltipContent} component.
 */
export interface TooltipContentEmits extends CreateEmits<Events> {}

export const TooltipContent: DefineSetupFnComponent<
  TooltipContentProps & HTMLAttributes,
  TooltipContentEmits
> = createComponent<
  TooltipContentProps,
  TooltipContentEmits
>(
  'prosekit-tooltip-content',
  'TooltipContent',
  Object.keys(tooltipContentProps),
  Object.keys(tooltipContentEvents),
)
