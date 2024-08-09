import type { Editor } from '@prosekit/core'

export interface TableColumnPopoverTriggerProps {
  editor: Editor | null
}

export const defaultTableColumnPopoverTriggerProps = Object.freeze({
  editor: null,
})
