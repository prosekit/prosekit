import { defineCustomElement, registerCustomElement } from "@aria-ui/core"

import { useTableHandleColumnRoot } from "./setup"
import { tableHandleColumnRootEvents, tableHandleColumnRootProps, type TableHandleColumnRootEvents, type TableHandleColumnRootProps } from "./types"

class TableHandleColumnRootElement extends defineCustomElement<
  TableHandleColumnRootProps,
  TableHandleColumnRootEvents
>({
  props: tableHandleColumnRootProps,
  events: tableHandleColumnRootEvents,
  setup: useTableHandleColumnRoot,
}) {}

registerCustomElement('prosekit-table-handle-column-root', TableHandleColumnRootElement)
  
export { TableHandleColumnRootElement }
