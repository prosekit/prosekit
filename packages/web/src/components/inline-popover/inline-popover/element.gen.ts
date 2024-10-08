import { defineCustomElement, registerCustomElement } from "@aria-ui/core"

import { useInlinePopover } from "./setup"
import { inlinePopoverEvents, inlinePopoverProps, type InlinePopoverEvents, type InlinePopoverProps } from "./types"

class InlinePopoverElement extends defineCustomElement<
  InlinePopoverProps,
  InlinePopoverEvents
>({
  props: inlinePopoverProps,
  events: inlinePopoverEvents,
  setup: useInlinePopover,
}) {}

registerCustomElement('prosekit-inline-popover', InlinePopoverElement)
  
export { InlinePopoverElement }
