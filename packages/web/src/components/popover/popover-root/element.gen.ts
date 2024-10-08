import { defineCustomElement, registerCustomElement } from "@aria-ui/core"

import { usePopoverRoot } from "./setup"
import { popoverRootEvents, popoverRootProps, type PopoverRootEvents, type PopoverRootProps } from "./types"

class PopoverRootElement extends defineCustomElement<
  PopoverRootProps,
  PopoverRootEvents
>({
  props: popoverRootProps,
  events: popoverRootEvents,
  setup: usePopoverRoot,
}) {}

registerCustomElement('prosekit-popover-root', PopoverRootElement)
  
export { PopoverRootElement }
