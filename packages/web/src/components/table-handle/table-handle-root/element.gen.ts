import { defineCustomElement, registerCustomElement, type BaseElementConstructor } from "@aria-ui/core"

import { useTableHandleRoot } from "./setup.ts"
import { tableHandleRootEvents, tableHandleRootProps, type TableHandleRootEvents, type TableHandleRootProps } from "./types.ts"

const TableHandleRootElementBase: BaseElementConstructor<TableHandleRootProps> = defineCustomElement<
  TableHandleRootProps,
  TableHandleRootEvents
>({
  props: tableHandleRootProps,
  events: tableHandleRootEvents,
  setup: useTableHandleRoot,
})
class TableHandleRootElement extends TableHandleRootElementBase {}

registerCustomElement('prosekit-table-handle-root', TableHandleRootElement)
  
export { TableHandleRootElement }
