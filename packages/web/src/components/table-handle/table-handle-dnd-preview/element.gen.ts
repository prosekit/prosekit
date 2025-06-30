import { defineCustomElement, registerCustomElement, type BaseElementConstructor } from "@aria-ui/core"

import { useTableHandleDndPreview } from "./setup"
import { tableHandleDndPreviewEvents, tableHandleDndPreviewProps, type TableHandleDndPreviewEvents, type TableHandleDndPreviewProps } from "./types"

const TableHandleDndPreviewElementBase: BaseElementConstructor<TableHandleDndPreviewProps> = defineCustomElement<
  TableHandleDndPreviewProps,
  TableHandleDndPreviewEvents
>({
  props: tableHandleDndPreviewProps,
  events: tableHandleDndPreviewEvents,
  setup: useTableHandleDndPreview,
})
class TableHandleDndPreviewElement extends TableHandleDndPreviewElementBase {}

registerCustomElement('prosekit-table-handle-dnd-preview', TableHandleDndPreviewElement)
  
export { TableHandleDndPreviewElement }
