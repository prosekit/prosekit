import { defineCustomElement, registerCustomElement, type BaseElementConstructor } from "@aria-ui/core"

import { useTableHandleRowRoot } from "./setup"
import { tableHandleRowRootEvents, tableHandleRowRootProps, type TableHandleRowRootEvents, type TableHandleRowRootProps } from "./types"

const TableHandleRowRootElementBase: BaseElementConstructor<TableHandleRowRootProps> = defineCustomElement<
  TableHandleRowRootProps,
  TableHandleRowRootEvents
>({
  props: tableHandleRowRootProps,
  events: tableHandleRowRootEvents,
  setup: useTableHandleRowRoot,
})
class TableHandleRowRootElement extends TableHandleRowRootElementBase {}

registerCustomElement('prosekit-table-handle-row-root', TableHandleRowRootElement)
  
export { TableHandleRowRootElement }
