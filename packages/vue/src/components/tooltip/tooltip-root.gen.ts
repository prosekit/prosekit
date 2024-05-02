import { defaultTooltipRootProps, type TooltipRootProps } from '@prosekit/web/tooltip'

import { createComponent } from '../create-component'

export const TooltipRoot = createComponent<TooltipRootProps>('prosekit-tooltip-root', 'TooltipRoot', defaultTooltipRootProps)
