import { defineCustomElement, registerCustomElement, type BaseElementConstructor } from "@aria-ui/core"

import { useTableHandleRowTrigger } from "./setup"
import { tableHandleRowTriggerEvents, tableHandleRowTriggerProps, type TableHandleRowTriggerEvents, type TableHandleRowTriggerProps } from "./types"

const TableHandleRowTriggerElementBase: BaseElementConstructor<TableHandleRowTriggerProps> = defineCustomElement<
  TableHandleRowTriggerProps,
  TableHandleRowTriggerEvents
>({
  props: tableHandleRowTriggerProps,
  events: tableHandleRowTriggerEvents,
  setup: useTableHandleRowTrigger,
})
class TableHandleRowTriggerElement extends TableHandleRowTriggerElementBase {}

registerCustomElement('prosekit-table-handle-row-trigger', TableHandleRowTriggerElement)
  
export { TableHandleRowTriggerElement }
