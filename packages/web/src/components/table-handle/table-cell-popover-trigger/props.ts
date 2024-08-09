import type { Editor } from '@prosekit/core'

export interface TableCellPopoverTriggerProps {
  editor: Editor | null
}

export const defaultTableCellPopoverTriggerProps = Object.freeze({
  editor: null,
})
