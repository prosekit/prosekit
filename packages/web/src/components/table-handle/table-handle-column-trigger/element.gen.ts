import { defineCustomElement, registerCustomElement, type BaseElementConstructor } from "@aria-ui/core"

import { useTableHandleColumnTrigger } from "./setup"
import { tableHandleColumnTriggerEvents, tableHandleColumnTriggerProps, type TableHandleColumnTriggerEvents, type TableHandleColumnTriggerProps } from "./types"

const TableHandleColumnTriggerElementBase: BaseElementConstructor<TableHandleColumnTriggerProps> = defineCustomElement<
  TableHandleColumnTriggerProps,
  TableHandleColumnTriggerEvents
>({
  props: tableHandleColumnTriggerProps,
  events: tableHandleColumnTriggerEvents,
  setup: useTableHandleColumnTrigger,
})
class TableHandleColumnTriggerElement extends TableHandleColumnTriggerElementBase {}

registerCustomElement('prosekit-table-handle-column-trigger', TableHandleColumnTriggerElement)
  
export { TableHandleColumnTriggerElement }
