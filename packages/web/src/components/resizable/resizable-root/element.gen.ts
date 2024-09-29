import { defineCustomElement, registerCustomElement } from "@aria-ui/core"

import { useResizableRoot } from "./setup"
import { resizableRootEvents, resizableRootProps, type ResizableRootEvents, type ResizableRootProps } from "./types"

class ResizableRootElement extends defineCustomElement<
  ResizableRootProps,
  ResizableRootEvents
>({
  props: resizableRootProps,
  events: resizableRootEvents,
  setup: useResizableRoot,
}) {}

registerCustomElement('prosekit-resizable-root', ResizableRootElement)
  
export { ResizableRootElement }
