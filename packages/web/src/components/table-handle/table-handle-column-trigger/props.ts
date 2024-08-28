import type { Editor } from '@prosekit/core'
import type { defineTableCommands } from '@prosekit/extensions/table'

type TableCommandsExtension = ReturnType<typeof defineTableCommands>

export interface TableHandleColumnTriggerProps {
  editor: Editor<TableCommandsExtension> | null
}

export const defaultTableHandleColumnTriggerProps = Object.freeze({
  editor: null,
})
