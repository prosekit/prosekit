import type {
  EventDeclarations,
  PropDeclarations,
} from '@aria-ui/core'
import type { Editor } from '@prosekit/core'
import type { TableCommandsExtension } from '@prosekit/extensions/table'

export interface TableHandleDropCursorProps {
  editor: Editor<TableCommandsExtension> | null
}

export const tableHandleDropCursorProps: PropDeclarations<TableHandleDropCursorProps> = {
  editor: { default: null },
}

export interface TableHandleDropCursorEvents {}

export const tableHandleDropCursorEvents: EventDeclarations<TableHandleDropCursorEvents> = {}
