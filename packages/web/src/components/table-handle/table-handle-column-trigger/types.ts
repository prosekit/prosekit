import type {
  EmptyObject,
  EventDeclarations,
  PropDeclarations,
} from '@aria-ui/core'
import type { Editor } from '@prosekit/core'
import type { defineTableCommands } from '@prosekit/extensions/table'

type TableCommandsExtension = ReturnType<typeof defineTableCommands>

export interface TableHandleColumnTriggerProps {
  editor: Editor<TableCommandsExtension> | null
}

export const tableHandleColumnTriggerProps: PropDeclarations<TableHandleColumnTriggerProps> =
  {
    editor: { default: null },
  }

export interface TableHandleColumnTriggerEvents extends EmptyObject {}

export const tableHandleColumnTriggerEvents: EventDeclarations<TableHandleColumnTriggerEvents> =
  {}
