import type { EventDeclarations, PropDeclarations } from '@aria-ui/core'
import type { Editor } from '@prosekit/core'
import type { defineTableCommands } from '@prosekit/extensions/table'

type TableCommandsExtension = ReturnType<typeof defineTableCommands>

export interface TableHandleColumnTriggerProps {
  editor: Editor<TableCommandsExtension> | null
}

/** @internal */
export const tableHandleColumnTriggerProps: PropDeclarations<TableHandleColumnTriggerProps> = {
  editor: { default: null },
}

/** @internal */
export interface TableHandleColumnTriggerEvents {}

/** @internal */
export const tableHandleColumnTriggerEvents: EventDeclarations<TableHandleColumnTriggerEvents> = {}
