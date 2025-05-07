import { defineCustomElement, registerCustomElement, type BaseElementConstructor } from "@aria-ui/core"

import { useTooltipRoot } from "./setup"
import { tooltipRootEvents, tooltipRootProps, type TooltipRootEvents, type TooltipRootProps } from "./types"

const TooltipRootElementBase: BaseElementConstructor<TooltipRootProps> = defineCustomElement<
  TooltipRootProps,
  TooltipRootEvents
>({
  props: tooltipRootProps,
  events: tooltipRootEvents,
  setup: useTooltipRoot,
})
class TooltipRootElement extends TooltipRootElementBase {}

registerCustomElement('prosekit-tooltip-root', TooltipRootElement)
  
export { TooltipRootElement }
