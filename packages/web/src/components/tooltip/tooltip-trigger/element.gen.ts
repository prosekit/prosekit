import { defineCustomElement, registerCustomElement, type BaseElementConstructor } from "@aria-ui/core"

import { useTooltipTrigger } from "./setup"
import { tooltipTriggerEvents, tooltipTriggerProps, type TooltipTriggerEvents, type TooltipTriggerProps } from "./types"

const TooltipTriggerElementBase: BaseElementConstructor<TooltipTriggerProps> = defineCustomElement<
  TooltipTriggerProps,
  TooltipTriggerEvents
>({
  props: tooltipTriggerProps,
  events: tooltipTriggerEvents,
  setup: useTooltipTrigger,
})
class TooltipTriggerElement extends TooltipTriggerElementBase {}

registerCustomElement('prosekit-tooltip-trigger', TooltipTriggerElement)
  
export { TooltipTriggerElement }
