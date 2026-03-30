import { defineCustomElement, registerCustomElement, type BaseElementConstructor } from "@aria-ui/core"

import { useTableHandleDragPreview } from "./setup.ts"
import { tableHandleDragPreviewEvents, tableHandleDragPreviewProps, type TableHandleDragPreviewEvents, type TableHandleDragPreviewProps } from "./types.ts"

const TableHandleDragPreviewElementBase: BaseElementConstructor<TableHandleDragPreviewProps> = defineCustomElement<
  TableHandleDragPreviewProps,
  TableHandleDragPreviewEvents
>({
  props: tableHandleDragPreviewProps,
  events: tableHandleDragPreviewEvents,
  setup: useTableHandleDragPreview,
})
class TableHandleDragPreviewElement extends TableHandleDragPreviewElementBase {}

registerCustomElement('prosekit-table-handle-drag-preview', TableHandleDragPreviewElement)
  
export { TableHandleDragPreviewElement }
