import { defineCustomElement, registerCustomElement } from "@aria-ui/core"

import { useTooltipTrigger } from "./setup"
import { tooltipTriggerEvents, tooltipTriggerProps, type TooltipTriggerEvents, type TooltipTriggerProps } from "./types"

class TooltipTriggerElement extends defineCustomElement<
  TooltipTriggerProps,
  TooltipTriggerEvents
>({
  props: tooltipTriggerProps,
  events: tooltipTriggerEvents,
  setup: useTooltipTrigger,
}) {}

registerCustomElement('prosekit-tooltip-trigger', TooltipTriggerElement)
  
export { TooltipTriggerElement }
