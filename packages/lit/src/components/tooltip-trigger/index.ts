import { TooltipTriggerElement } from '@aria-ui/tooltip'

import { defineCustomElement } from '../../utils/define-custom-element'

export { TooltipTriggerElement as TooltipTrigger }

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TooltipTriggerProps {}

export { type TooltipTriggerProps }

export const propNames = []

defineCustomElement('prosekit-tooltip-trigger', TooltipTriggerElement)
