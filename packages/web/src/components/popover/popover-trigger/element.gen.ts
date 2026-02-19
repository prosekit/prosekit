import { defineCustomElement, registerCustomElement, type BaseElementConstructor } from "@aria-ui/core"

import { usePopoverTrigger } from "./setup.ts"
import { popoverTriggerEvents, popoverTriggerProps, type PopoverTriggerEvents, type PopoverTriggerProps } from "./types.ts"

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
