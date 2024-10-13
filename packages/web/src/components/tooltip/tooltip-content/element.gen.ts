import { defineCustomElement, registerCustomElement } from "@aria-ui/core"

import { useTooltipContent } from "./setup"
import { tooltipContentEvents, tooltipContentProps, type TooltipContentEvents, type TooltipContentProps } from "./types"

class TooltipContentElement extends defineCustomElement<
  TooltipContentProps,
  TooltipContentEvents
>({
  props: tooltipContentProps,
  events: tooltipContentEvents,
  setup: useTooltipContent,
}) {}

registerCustomElement('prosekit-tooltip-content', TooltipContentElement)
  
export { TooltipContentElement }
