import { defineCustomElement, registerCustomElement, type BaseElementConstructor } from "@aria-ui/core"

import { useTableHandleColumnRoot } from "./setup"
import { tableHandleColumnRootEvents, tableHandleColumnRootProps, type TableHandleColumnRootEvents, type TableHandleColumnRootProps } from "./types"

const TableHandleColumnRootElementBase: BaseElementConstructor<TableHandleColumnRootProps> = defineCustomElement<
  TableHandleColumnRootProps,
  TableHandleColumnRootEvents
>({
  props: tableHandleColumnRootProps,
  events: tableHandleColumnRootEvents,
  setup: useTableHandleColumnRoot,
})
class TableHandleColumnRootElement extends TableHandleColumnRootElementBase {}

registerCustomElement('prosekit-table-handle-column-root', TableHandleColumnRootElement)
  
export { TableHandleColumnRootElement }
