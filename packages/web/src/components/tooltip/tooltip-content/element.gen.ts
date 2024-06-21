import { ElementBuilder } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'

import { defaultTooltipContentProps, type TooltipContentProps } from './props'
import { useTooltipContent } from './state'

class TooltipContentElement extends ElementBuilder<TooltipContentProps>(useTooltipContent, defaultTooltipContentProps) {}

defineCustomElement('prosekit-tooltip-content', TooltipContentElement)

export { TooltipContentElement }
