import { defineCustomElement, registerCustomElement } from "@aria-ui/core"

import { useTooltipRoot } from "./setup"
import { tooltipRootEvents, tooltipRootProps, type TooltipRootEvents, type TooltipRootProps } from "./types"

class TooltipRootElement extends defineCustomElement<
  TooltipRootProps,
  TooltipRootEvents
>({
  props: tooltipRootProps,
  events: tooltipRootEvents,
  setup: useTooltipRoot,
}) {}

registerCustomElement('prosekit-tooltip-root', TooltipRootElement)
  
export { TooltipRootElement }
