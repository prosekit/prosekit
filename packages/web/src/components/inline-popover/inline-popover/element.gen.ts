import { defineCustomElement, registerCustomElement, type BaseElementConstructor } from "@aria-ui/core"

import { useInlinePopover } from "./setup"
import { inlinePopoverEvents, inlinePopoverProps, type InlinePopoverEvents, type InlinePopoverProps } from "./types"

const InlinePopoverElementBase: BaseElementConstructor<InlinePopoverProps> = defineCustomElement<
  InlinePopoverProps,
  InlinePopoverEvents
>({
  props: inlinePopoverProps,
  events: inlinePopoverEvents,
  setup: useInlinePopover,
})
class InlinePopoverElement extends InlinePopoverElementBase {}

registerCustomElement('prosekit-inline-popover', InlinePopoverElement)
  
export { InlinePopoverElement }
