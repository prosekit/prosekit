import type {
  EventDeclarations,
  PropDeclarations,
} from '@aria-ui/core'
import type { Editor } from '@prosekit/core'
import type { TableCommandsExtension } from '@prosekit/extensions/table'

export interface TableHandleDropIndicatorProps {
  editor: Editor<TableCommandsExtension> | null
}

export const tableHandleDropIndicatorProps: PropDeclarations<TableHandleDropIndicatorProps> = {
  editor: { default: null },
}

export interface TableHandleDropIndicatorEvents {}

export const tableHandleDropIndicatorEvents: EventDeclarations<TableHandleDropIndicatorEvents> = {}
