import { defineCustomElement, registerCustomElement } from "@aria-ui/core"

import { useTableHandlePopoverItem } from "./setup"
import { tableHandlePopoverItemEvents, tableHandlePopoverItemProps, type TableHandlePopoverItemEvents, type TableHandlePopoverItemProps } from "./types"

class TableHandlePopoverItemElement extends defineCustomElement<
  TableHandlePopoverItemProps,
  TableHandlePopoverItemEvents
>({
  props: tableHandlePopoverItemProps,
  events: tableHandlePopoverItemEvents,
  setup: useTableHandlePopoverItem,
}) {}

registerCustomElement('prosekit-table-handle-popover-item', TableHandlePopoverItemElement)
  
export { TableHandlePopoverItemElement }
