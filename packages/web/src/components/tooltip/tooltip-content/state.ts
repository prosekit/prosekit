import { assignProps, type ConnectableElement } from '@aria-ui/core'
import { useTooltipContent as useElement } from '@aria-ui/tooltip'

import { defaultTooltipContentProps, type TooltipContentProps } from './props'

export function useTooltipContent(
  element: ConnectableElement,
  props?: Partial<TooltipContentProps>,
) {
  return useElement(element, assignProps(defaultTooltipContentProps, props))
}
