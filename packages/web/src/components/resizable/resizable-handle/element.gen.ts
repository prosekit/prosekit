import { defineCustomElement, registerCustomElement } from "@aria-ui/core"

import { useResizableHandle } from "./setup"
import { resizableHandleEvents, resizableHandleProps, type ResizableHandleEvents, type ResizableHandleProps } from "./types"

class ResizableHandleElement extends defineCustomElement<
  ResizableHandleProps,
  ResizableHandleEvents
>({
  props: resizableHandleProps,
  events: resizableHandleEvents,
  setup: useResizableHandle,
}) {}

registerCustomElement('prosekit-resizable-handle', ResizableHandleElement)
  
export { ResizableHandleElement }
