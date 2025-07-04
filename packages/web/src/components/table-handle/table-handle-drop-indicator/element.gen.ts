import { defineCustomElement, registerCustomElement, type BaseElementConstructor } from "@aria-ui/core"

import { useTableHandleDropIndicator } from "./setup"
import { tableHandleDropIndicatorEvents, tableHandleDropIndicatorProps, type TableHandleDropIndicatorEvents, type TableHandleDropIndicatorProps } from "./types"

const TableHandleDropIndicatorElementBase: BaseElementConstructor<TableHandleDropIndicatorProps> = defineCustomElement<
  TableHandleDropIndicatorProps,
  TableHandleDropIndicatorEvents
>({
  props: tableHandleDropIndicatorProps,
  events: tableHandleDropIndicatorEvents,
  setup: useTableHandleDropIndicator,
})
class TableHandleDropIndicatorElement extends TableHandleDropIndicatorElementBase {}

registerCustomElement('prosekit-table-handle-drop-indicator', TableHandleDropIndicatorElement)
  
export { TableHandleDropIndicatorElement }
