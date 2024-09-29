import { defineCustomElement, registerCustomElement } from "@aria-ui/core"

import { useBlockHandlePopover } from "./setup"
import { blockHandlePopoverEvents, blockHandlePopoverProps, type BlockHandlePopoverEvents, type BlockHandlePopoverProps } from "./types"

class BlockHandlePopoverElement extends defineCustomElement<
  BlockHandlePopoverProps,
  BlockHandlePopoverEvents
>({
  props: blockHandlePopoverProps,
  events: blockHandlePopoverEvents,
  setup: useBlockHandlePopover,
}) {}

registerCustomElement('prosekit-block-handle-popover', BlockHandlePopoverElement)
  
export { BlockHandlePopoverElement }
