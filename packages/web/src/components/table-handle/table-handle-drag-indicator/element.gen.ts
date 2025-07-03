import { defineCustomElement, registerCustomElement, type BaseElementConstructor } from "@aria-ui/core"

import { useTableHandleDragIndicator } from "./setup"
import { tableHandleDragIndicatorEvents, tableHandleDragIndicatorProps, type TableHandleDragIndicatorEvents, type TableHandleDragIndicatorProps } from "./types"

const TableHandleDragIndicatorElementBase: BaseElementConstructor<TableHandleDragIndicatorProps> = defineCustomElement<
  TableHandleDragIndicatorProps,
  TableHandleDragIndicatorEvents
>({
  props: tableHandleDragIndicatorProps,
  events: tableHandleDragIndicatorEvents,
  setup: useTableHandleDragIndicator,
})
class TableHandleDragIndicatorElement extends TableHandleDragIndicatorElementBase {}

registerCustomElement('prosekit-table-handle-drag-indicator', TableHandleDragIndicatorElement)
  
export { TableHandleDragIndicatorElement }
