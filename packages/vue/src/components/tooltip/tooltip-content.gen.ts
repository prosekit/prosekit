import { defaultTooltipContentProps, type TooltipContentProps } from '@prosekit/primitives/tooltip'

import { createComponent } from './create-component'

export const TooltipContent = createComponent<TooltipContentProps>('prosekit-tooltip-content', 'TooltipContent', defaultTooltipContentProps)
