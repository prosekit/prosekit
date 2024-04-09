import {
  TooltipContentElement,
  defaultTooltipContentProps,
  type TooltipContentProps as TooltipContentElementProps,
} from '@aria-ui/tooltip'

import { defineCustomElement } from '../../utils/define-custom-element'

export { TooltipContentElement as TooltipContent }

export type TooltipContentProps = Partial<TooltipContentElementProps>

export const propNames = Object.keys(
  defaultTooltipContentProps,
) as (keyof TooltipContentProps)[]

defineCustomElement('prosekit-tooltip-content', TooltipContentElement)
