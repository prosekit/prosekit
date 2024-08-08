import type { Editor } from '@prosekit/core'
import type { defineTableCommands } from '@prosekit/extensions/table'

type TableCommandsExtension = ReturnType<typeof defineTableCommands>

export interface TableRowPopoverTriggerProps {
  editor: Editor<TableCommandsExtension> | null
}

export const defaultTableRowPopoverTriggerProps = Object.freeze({
  editor: null,
})
