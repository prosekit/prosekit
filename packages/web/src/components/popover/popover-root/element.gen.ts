import { defineCustomElement, registerCustomElement, type BaseElementConstructor } from "@aria-ui/core"

import { usePopoverRoot } from "./setup.ts"
import { popoverRootEvents, popoverRootProps, type PopoverRootEvents, type PopoverRootProps } from "./types.ts"

const PopoverRootElementBase: BaseElementConstructor<PopoverRootProps> = defineCustomElement<
  PopoverRootProps,
  PopoverRootEvents
>({
  props: popoverRootProps,
  events: popoverRootEvents,
  setup: usePopoverRoot,
})
class PopoverRootElement extends PopoverRootElementBase {}

registerCustomElement('prosekit-popover-root', PopoverRootElement)
  
export { PopoverRootElement }
