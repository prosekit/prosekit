import type { Editor } from '@prosekit/core'
import type { defineTableCommands } from '@prosekit/extensions/table'

type TableCommandsExtension = ReturnType<typeof defineTableCommands>

export interface TableHandleRowTriggerProps {
  editor: Editor<TableCommandsExtension> | null
}

export const defaultTableHandleRowTriggerProps = Object.freeze({
  editor: null,
})
