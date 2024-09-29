import { defineCustomElement, registerCustomElement } from "@aria-ui/core"

import { useBlockHandleAdd } from "./setup"
import { blockHandleAddEvents, blockHandleAddProps, type BlockHandleAddEvents, type BlockHandleAddProps } from "./types"

class BlockHandleAddElement extends defineCustomElement<
  BlockHandleAddProps,
  BlockHandleAddEvents
>({
  props: blockHandleAddProps,
  events: blockHandleAddEvents,
  setup: useBlockHandleAdd,
}) {}

registerCustomElement('prosekit-block-handle-add', BlockHandleAddElement)
  
export { BlockHandleAddElement }
