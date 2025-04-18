import { defineCustomElement, registerCustomElement, type BaseElementConstructor } from "@aria-ui/core"

import { useTableHandlePopoverContent } from "./setup"
import { tableHandlePopoverContentEvents, tableHandlePopoverContentProps, type TableHandlePopoverContentEvents, type TableHandlePopoverContentProps } from "./types"

const TableHandlePopoverContentElementBase: BaseElementConstructor<TableHandlePopoverContentProps> = defineCustomElement<
  TableHandlePopoverContentProps,
  TableHandlePopoverContentEvents
>({
  props: tableHandlePopoverContentProps,
  events: tableHandlePopoverContentEvents,
  setup: useTableHandlePopoverContent,
})
class TableHandlePopoverContentElement extends TableHandlePopoverContentElementBase {}

registerCustomElement('prosekit-table-handle-popover-content', TableHandlePopoverContentElement)
  
export { TableHandlePopoverContentElement }
