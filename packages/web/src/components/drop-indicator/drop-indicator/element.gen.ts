import { defineCustomElement, registerCustomElement, type BaseElementConstructor } from "@aria-ui/core"

import { useDropIndicator } from "./setup"
import { dropIndicatorEvents, dropIndicatorProps, type DropIndicatorEvents, type DropIndicatorProps } from "./types"

const DropIndicatorElementBase: BaseElementConstructor<DropIndicatorProps> = defineCustomElement<
  DropIndicatorProps,
  DropIndicatorEvents
>({
  props: dropIndicatorProps,
  events: dropIndicatorEvents,
  setup: useDropIndicator,
})
class DropIndicatorElement extends DropIndicatorElementBase {}

registerCustomElement('prosekit-drop-indicator', DropIndicatorElement)
  
export { DropIndicatorElement }
