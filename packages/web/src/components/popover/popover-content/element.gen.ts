import { defineCustomElement, registerCustomElement } from "@aria-ui/core"

import { usePopoverContent } from "./setup"
import { popoverContentEvents, popoverContentProps, type PopoverContentEvents, type PopoverContentProps } from "./types"

class PopoverContentElement extends defineCustomElement<
  PopoverContentProps,
  PopoverContentEvents
>({
  props: popoverContentProps,
  events: popoverContentEvents,
  setup: usePopoverContent,
}) {}

registerCustomElement('prosekit-popover-content', PopoverContentElement)
  
export { PopoverContentElement }
