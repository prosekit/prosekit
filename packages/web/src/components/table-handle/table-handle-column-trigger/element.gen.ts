import { defineCustomElement, registerCustomElement } from "@aria-ui/core"

import { useTableHandleColumnTrigger } from "./setup"
import { tableHandleColumnTriggerEvents, tableHandleColumnTriggerProps, type TableHandleColumnTriggerEvents, type TableHandleColumnTriggerProps } from "./types"

class TableHandleColumnTriggerElement extends defineCustomElement<
  TableHandleColumnTriggerProps,
  TableHandleColumnTriggerEvents
>({
  props: tableHandleColumnTriggerProps,
  events: tableHandleColumnTriggerEvents,
  setup: useTableHandleColumnTrigger,
}) {}

registerCustomElement('prosekit-table-handle-column-trigger', TableHandleColumnTriggerElement)
  
export { TableHandleColumnTriggerElement }
