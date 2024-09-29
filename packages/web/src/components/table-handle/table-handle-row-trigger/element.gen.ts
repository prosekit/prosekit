import { defineCustomElement, registerCustomElement } from "@aria-ui/core"

import { useTableHandleRowTrigger } from "./setup"
import { tableHandleRowTriggerEvents, tableHandleRowTriggerProps, type TableHandleRowTriggerEvents, type TableHandleRowTriggerProps } from "./types"

class TableHandleRowTriggerElement extends defineCustomElement<
  TableHandleRowTriggerProps,
  TableHandleRowTriggerEvents
>({
  props: tableHandleRowTriggerProps,
  events: tableHandleRowTriggerEvents,
  setup: useTableHandleRowTrigger,
}) {}

registerCustomElement('prosekit-table-handle-row-trigger', TableHandleRowTriggerElement)
  
export { TableHandleRowTriggerElement }
