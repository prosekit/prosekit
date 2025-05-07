import { defineCustomElement, registerCustomElement, type BaseElementConstructor } from "@aria-ui/core"

import { usePopoverTrigger } from "./setup"
import { popoverTriggerEvents, popoverTriggerProps, type PopoverTriggerEvents, type PopoverTriggerProps } from "./types"

const PopoverTriggerElementBase: BaseElementConstructor<PopoverTriggerProps> = defineCustomElement<
  PopoverTriggerProps,
  PopoverTriggerEvents
>({
  props: popoverTriggerProps,
  events: popoverTriggerEvents,
  setup: usePopoverTrigger,
})
class PopoverTriggerElement extends PopoverTriggerElementBase {}

registerCustomElement('prosekit-popover-trigger', PopoverTriggerElement)
  
export { PopoverTriggerElement }
