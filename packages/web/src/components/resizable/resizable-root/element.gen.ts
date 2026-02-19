import { defineCustomElement, registerCustomElement, type BaseElementConstructor } from "@aria-ui/core"

import { useResizableRoot } from "./setup.ts"
import { resizableRootEvents, resizableRootProps, type ResizableRootEvents, type ResizableRootProps } from "./types.ts"

const ResizableRootElementBase: BaseElementConstructor<ResizableRootProps> = defineCustomElement<
  ResizableRootProps,
  ResizableRootEvents
>({
  props: resizableRootProps,
  events: resizableRootEvents,
  setup: useResizableRoot,
})
class ResizableRootElement extends ResizableRootElementBase {}

registerCustomElement('prosekit-resizable-root', ResizableRootElement)
  
export { ResizableRootElement }
