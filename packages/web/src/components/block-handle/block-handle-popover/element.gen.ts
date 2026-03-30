import { defineCustomElement, registerCustomElement, type BaseElementConstructor } from "@aria-ui/core"

import { useBlockHandlePopover } from "./setup.ts"
import { blockHandlePopoverEvents, blockHandlePopoverProps, type BlockHandlePopoverEvents, type BlockHandlePopoverProps } from "./types.ts"

const BlockHandlePopoverElementBase: BaseElementConstructor<BlockHandlePopoverProps> = defineCustomElement<
  BlockHandlePopoverProps,
  BlockHandlePopoverEvents
>({
  props: blockHandlePopoverProps,
  events: blockHandlePopoverEvents,
  setup: useBlockHandlePopover,
})
class BlockHandlePopoverElement extends BlockHandlePopoverElementBase {}

registerCustomElement('prosekit-block-handle-popover', BlockHandlePopoverElement)
  
export { BlockHandlePopoverElement }
