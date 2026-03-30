import {
  tooltipRootProps,
  tooltipRootEvents,
  type TooltipRootProps as Props,
  type TooltipRootEvents as Events,
} from '@prosekit/web/tooltip'
import type { DefineSetupFnComponent, HTMLAttributes } from 'vue'

import { createComponent } from '../create-component.ts'
import type { CreateEmits } from '../create-emits.ts'

/**
 * Props for the {@link TooltipRoot} component.
 */
export interface TooltipRootProps extends Partial<Props> {}

/**
 * Emits for the {@link TooltipRoot} component.
 */
export interface TooltipRootEmits extends CreateEmits<Events> {}

export const TooltipRoot: DefineSetupFnComponent<
  TooltipRootProps & HTMLAttributes,
  TooltipRootEmits
> = createComponent<
  TooltipRootProps,
  TooltipRootEmits
>(
  'prosekit-tooltip-root',
  'TooltipRoot',
  Object.keys(tooltipRootProps),
  Object.keys(tooltipRootEvents),
)
