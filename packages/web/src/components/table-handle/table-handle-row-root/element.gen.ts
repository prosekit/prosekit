import { defineCustomElement, registerCustomElement } from "@aria-ui/core"

import { useTableHandleRowRoot } from "./setup"
import { tableHandleRowRootEvents, tableHandleRowRootProps, type TableHandleRowRootEvents, type TableHandleRowRootProps } from "./types"

class TableHandleRowRootElement extends defineCustomElement<
  TableHandleRowRootProps,
  TableHandleRowRootEvents
>({
  props: tableHandleRowRootProps,
  events: tableHandleRowRootEvents,
  setup: useTableHandleRowRoot,
}) {}

registerCustomElement('prosekit-table-handle-row-root', TableHandleRowRootElement)
  
export { TableHandleRowRootElement }
