import { defineCustomElement, registerCustomElement, type BaseElementConstructor } from "@aria-ui/core"

import { useTooltipContent } from "./setup"
import { tooltipContentEvents, tooltipContentProps, type TooltipContentEvents, type TooltipContentProps } from "./types"

const TooltipContentElementBase: BaseElementConstructor<TooltipContentProps> = defineCustomElement<
  TooltipContentProps,
  TooltipContentEvents
>({
  props: tooltipContentProps,
  events: tooltipContentEvents,
  setup: useTooltipContent,
})
class TooltipContentElement extends TooltipContentElementBase {}

registerCustomElement('prosekit-tooltip-content', TooltipContentElement)
  
export { TooltipContentElement }
