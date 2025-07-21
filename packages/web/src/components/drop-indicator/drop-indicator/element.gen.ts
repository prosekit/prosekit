import { defineCustomElement, registerCustomElement, type BaseElementConstructor } from "@aria-ui/core"

import { useBlockHandleDropIndicator } from "./setup"
import { blockHandleDropIndicatorEvents, blockHandleDropIndicatorProps, type BlockHandleDropIndicatorEvents, type BlockHandleDropIndicatorProps } from "./types"

const BlockHandleDropIndicatorElementBase: BaseElementConstructor<BlockHandleDropIndicatorProps> = defineCustomElement<
  BlockHandleDropIndicatorProps,
  BlockHandleDropIndicatorEvents
>({
  props: blockHandleDropIndicatorProps,
  events: blockHandleDropIndicatorEvents,
  setup: useBlockHandleDropIndicator,
})
class BlockHandleDropIndicatorElement extends BlockHandleDropIndicatorElementBase {}

registerCustomElement('prosekit-block-handle-add', BlockHandleDropIndicatorElement)
  
export { BlockHandleDropIndicatorElement }
