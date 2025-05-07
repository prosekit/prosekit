import { defineCustomElement, registerCustomElement, type BaseElementConstructor } from "@aria-ui/core"

import { useBlockHandleDraggable } from "./setup"
import { blockHandleDraggableEvents, blockHandleDraggableProps, type BlockHandleDraggableEvents, type BlockHandleDraggableProps } from "./types"

const BlockHandleDraggableElementBase: BaseElementConstructor<BlockHandleDraggableProps> = defineCustomElement<
  BlockHandleDraggableProps,
  BlockHandleDraggableEvents
>({
  props: blockHandleDraggableProps,
  events: blockHandleDraggableEvents,
  setup: useBlockHandleDraggable,
})
class BlockHandleDraggableElement extends BlockHandleDraggableElementBase {}

registerCustomElement('prosekit-block-handle-draggable', BlockHandleDraggableElement)
  
export { BlockHandleDraggableElement }
