import { defineCustomElement, registerCustomElement } from "@aria-ui/core"

import { useTableHandleRoot } from "./setup"
import { tableHandleRootEvents, tableHandleRootProps, type TableHandleRootEvents, type TableHandleRootProps } from "./types"

class TableHandleRootElement extends defineCustomElement<
  TableHandleRootProps,
  TableHandleRootEvents
>({
  props: tableHandleRootProps,
  events: tableHandleRootEvents,
  setup: useTableHandleRoot,
}) {}

registerCustomElement('prosekit-table-handle-root', TableHandleRootElement)
  
export { TableHandleRootElement }
