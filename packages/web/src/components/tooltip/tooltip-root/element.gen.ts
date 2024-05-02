import { ElementMixin } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'

import { defaultTooltipRootProps, type TooltipRootProps } from './props'
import { useTooltipRoot } from './state'

class TooltipRootElement extends ElementMixin<TooltipRootProps>(useTooltipRoot, defaultTooltipRootProps) {}

defineCustomElement('prosekit-tooltip-root', TooltipRootElement)

export { TooltipRootElement }
