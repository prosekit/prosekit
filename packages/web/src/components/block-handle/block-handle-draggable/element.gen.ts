import { defineCustomElement, registerCustomElement } from "@aria-ui/core"

import { useBlockHandleDraggable } from "./setup"
import { blockHandleDraggableEvents, blockHandleDraggableProps, type BlockHandleDraggableEvents, type BlockHandleDraggableProps } from "./types"

class BlockHandleDraggableElement extends defineCustomElement<
  BlockHandleDraggableProps,
  BlockHandleDraggableEvents
>({
  props: blockHandleDraggableProps,
  events: blockHandleDraggableEvents,
  setup: useBlockHandleDraggable,
}) {}

registerCustomElement('prosekit-block-handle-draggable', BlockHandleDraggableElement)
  
export { BlockHandleDraggableElement }
