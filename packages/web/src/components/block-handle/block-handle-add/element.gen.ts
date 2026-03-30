import { defineCustomElement, registerCustomElement, type BaseElementConstructor } from "@aria-ui/core"

import { useBlockHandleAdd } from "./setup.ts"
import { blockHandleAddEvents, blockHandleAddProps, type BlockHandleAddEvents, type BlockHandleAddProps } from "./types.ts"

const BlockHandleAddElementBase: BaseElementConstructor<BlockHandleAddProps> = defineCustomElement<
  BlockHandleAddProps,
  BlockHandleAddEvents
>({
  props: blockHandleAddProps,
  events: blockHandleAddEvents,
  setup: useBlockHandleAdd,
})
class BlockHandleAddElement extends BlockHandleAddElementBase {}

registerCustomElement('prosekit-block-handle-add', BlockHandleAddElement)
  
export { BlockHandleAddElement }
