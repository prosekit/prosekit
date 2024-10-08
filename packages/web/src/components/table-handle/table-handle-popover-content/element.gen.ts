import { defineCustomElement, registerCustomElement } from "@aria-ui/core"

import { useTableHandlePopoverContent } from "./setup"
import { tableHandlePopoverContentEvents, tableHandlePopoverContentProps, type TableHandlePopoverContentEvents, type TableHandlePopoverContentProps } from "./types"

class TableHandlePopoverContentElement extends defineCustomElement<
  TableHandlePopoverContentProps,
  TableHandlePopoverContentEvents
>({
  props: tableHandlePopoverContentProps,
  events: tableHandlePopoverContentEvents,
  setup: useTableHandlePopoverContent,
}) {}

registerCustomElement('prosekit-table-handle-popover-content', TableHandlePopoverContentElement)
  
export { TableHandlePopoverContentElement }
