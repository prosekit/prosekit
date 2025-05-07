import { defineCustomElement, registerCustomElement, type BaseElementConstructor } from "@aria-ui/core"

import { useResizableHandle } from "./setup"
import { resizableHandleEvents, resizableHandleProps, type ResizableHandleEvents, type ResizableHandleProps } from "./types"

const ResizableHandleElementBase: BaseElementConstructor<ResizableHandleProps> = defineCustomElement<
  ResizableHandleProps,
  ResizableHandleEvents
>({
  props: resizableHandleProps,
  events: resizableHandleEvents,
  setup: useResizableHandle,
})
class ResizableHandleElement extends ResizableHandleElementBase {}

registerCustomElement('prosekit-resizable-handle', ResizableHandleElement)
  
export { ResizableHandleElement }
