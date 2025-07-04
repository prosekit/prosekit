import { defineCustomElement, registerCustomElement, type BaseElementConstructor } from "@aria-ui/core"

import { useTableHandleDropCursor } from "./setup"
import { tableHandleDropCursorEvents, tableHandleDropCursorProps, type TableHandleDropCursorEvents, type TableHandleDropCursorProps } from "./types"

const TableHandleDropCursorElementBase: BaseElementConstructor<TableHandleDropCursorProps> = defineCustomElement<
  TableHandleDropCursorProps,
  TableHandleDropCursorEvents
>({
  props: tableHandleDropCursorProps,
  events: tableHandleDropCursorEvents,
  setup: useTableHandleDropCursor,
})
class TableHandleDropCursorElement extends TableHandleDropCursorElementBase {}

registerCustomElement('prosekit-table-handle-drop-cursor', TableHandleDropCursorElement)
  
export { TableHandleDropCursorElement }
