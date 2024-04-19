import { defaultTooltipTriggerProps, type TooltipTriggerProps } from '@prosekit/primitives/tooltip'

import { createComponent } from './create-component'

export const TooltipTrigger = createComponent<TooltipTriggerProps>('prosekit-tooltip-trigger', 'TooltipTrigger', defaultTooltipTriggerProps)
