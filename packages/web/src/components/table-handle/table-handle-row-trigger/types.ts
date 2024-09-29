import type { EventDeclarations, PropDeclarations } from '@aria-ui/core'
import type { Editor } from '@prosekit/core'
import type { defineTableCommands } from '@prosekit/extensions/table'

type TableCommandsExtension = ReturnType<typeof defineTableCommands>

export interface TableHandleRowTriggerProps {
  editor: Editor<TableCommandsExtension> | null
}

export const tableHandleRowTriggerProps: PropDeclarations<TableHandleRowTriggerProps> =
  {
    editor: { default: null },
  }

export interface TableHandleRowTriggerEvents {
  select: CustomEvent<void>
}

export const tableHandleRowTriggerEvents: EventDeclarations<TableHandleRowTriggerEvents> =
  {
    select: {},
  }
