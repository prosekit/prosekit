import { defineCustomElement, registerCustomElement, type BaseElementConstructor } from "@aria-ui/core"

import { usePopoverContent } from "./setup"
import { popoverContentEvents, popoverContentProps, type PopoverContentEvents, type PopoverContentProps } from "./types"

const PopoverContentElementBase: BaseElementConstructor<PopoverContentProps> = defineCustomElement<
  PopoverContentProps,
  PopoverContentEvents
>({
  props: popoverContentProps,
  events: popoverContentEvents,
  setup: usePopoverContent,
})
class PopoverContentElement extends PopoverContentElementBase {}

registerCustomElement('prosekit-popover-content', PopoverContentElement)
  
export { PopoverContentElement }
