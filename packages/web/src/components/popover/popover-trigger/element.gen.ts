import { defineCustomElement, registerCustomElement } from "@aria-ui/core"

import { usePopoverTrigger } from "./setup"
import { popoverTriggerEvents, popoverTriggerProps, type PopoverTriggerEvents, type PopoverTriggerProps } from "./types"

class PopoverTriggerElement extends defineCustomElement<
  PopoverTriggerProps,
  PopoverTriggerEvents
>({
  props: popoverTriggerProps,
  events: popoverTriggerEvents,
  setup: usePopoverTrigger,
}) {}

registerCustomElement('prosekit-popover-trigger', PopoverTriggerElement)
  
export { PopoverTriggerElement }
