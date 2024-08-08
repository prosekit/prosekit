import type { Editor } from '@prosekit/core'
import type { defineTableCommands } from '@prosekit/extensions/table'

type TableCommandsExtension = ReturnType<typeof defineTableCommands>

export interface TableColumnPopoverTriggerProps {
  editor: Editor<TableCommandsExtension> | null
}

export const defaultTableColumnPopoverTriggerProps = Object.freeze({
  editor: null,
})
