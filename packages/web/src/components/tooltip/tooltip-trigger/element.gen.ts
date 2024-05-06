import { ElementMixin } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'

import { defaultTooltipTriggerProps, type TooltipTriggerProps } from './props'
import { useTooltipTrigger } from './state'

class TooltipTriggerElement extends ElementMixin<TooltipTriggerProps>(useTooltipTrigger, defaultTooltipTriggerProps) {}

defineCustomElement('prosekit-tooltip-trigger', TooltipTriggerElement)

export { TooltipTriggerElement }
