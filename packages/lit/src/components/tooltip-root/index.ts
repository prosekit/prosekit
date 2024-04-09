import {
  TooltipRootElement,
  defaultTooltipRootProps,
  type TooltipRootProps as TooltipRootElementProps,
} from '@aria-ui/tooltip'

import { defineCustomElement } from '../../utils/define-custom-element'

export { TooltipRootElement as TooltipRoot }

export type TooltipRootProps = Partial<TooltipRootElementProps>

export const propNames = Object.keys(
  defaultTooltipRootProps,
) as (keyof TooltipRootProps)[]

defineCustomElement('prosekit-tooltip-root', TooltipRootElement)
