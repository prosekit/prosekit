import { defineCustomElement, registerCustomElement, type BaseElementConstructor } from "@aria-ui/core"

import { useTableHandleDndIndicator } from "./setup"
import { tableHandleDndIndicatorEvents, tableHandleDndIndicatorProps, type TableHandleDndIndicatorEvents, type TableHandleDndIndicatorProps } from "./types"

const TableHandleDndIndicatorElementBase: BaseElementConstructor<TableHandleDndIndicatorProps> = defineCustomElement<
  TableHandleDndIndicatorProps,
  TableHandleDndIndicatorEvents
>({
  props: tableHandleDndIndicatorProps,
  events: tableHandleDndIndicatorEvents,
  setup: useTableHandleDndIndicator,
})
class TableHandleDndIndicatorElement extends TableHandleDndIndicatorElementBase {}

registerCustomElement('prosekit-table-handle-dnd-indicator', TableHandleDndIndicatorElement)
  
export { TableHandleDndIndicatorElement }
