import type {
  EventDeclarations,
  PropDeclarations,
} from '@aria-ui/core'
import type { Editor } from '@prosekit/core'

export interface TableHandleDragPreviewProps {
  editor: Editor | null
}

export const tableHandleDragPreviewProps: PropDeclarations<TableHandleDragPreviewProps> = {
  editor: { default: null },
}

export interface TableHandleDragPreviewEvents {}

export const tableHandleDragPreviewEvents: EventDeclarations<TableHandleDragPreviewEvents> = {}
