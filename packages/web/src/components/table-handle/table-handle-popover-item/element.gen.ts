import { defineCustomElement, registerCustomElement, type BaseElementConstructor } from "@aria-ui/core"

import { useTableHandlePopoverItem } from "./setup"
import { tableHandlePopoverItemEvents, tableHandlePopoverItemProps, type TableHandlePopoverItemEvents, type TableHandlePopoverItemProps } from "./types"

const TableHandlePopoverItemElementBase: BaseElementConstructor<TableHandlePopoverItemProps> = defineCustomElement<
  TableHandlePopoverItemProps,
  TableHandlePopoverItemEvents
>({
  props: tableHandlePopoverItemProps,
  events: tableHandlePopoverItemEvents,
  setup: useTableHandlePopoverItem,
})
class TableHandlePopoverItemElement extends TableHandlePopoverItemElementBase {}

registerCustomElement('prosekit-table-handle-popover-item', TableHandlePopoverItemElement)
  
export { TableHandlePopoverItemElement }
