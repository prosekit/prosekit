import type {
  EventDeclarations,
  PropDeclarations,
} from '@aria-ui/core'
import type { Editor } from '@prosekit/core'
import type { TableCommandsExtension } from '@prosekit/extensions/table'

export interface TableHandleDragIndicatorProps {
  editor: Editor<TableCommandsExtension> | null
}

export const tableHandleDragIndicatorProps: PropDeclarations<TableHandleDragIndicatorProps> = {
  editor: { default: null },
}

export interface TableHandleDragIndicatorEvents {}

export const tableHandleDragIndicatorEvents: EventDeclarations<TableHandleDragIndicatorEvents> = {}
