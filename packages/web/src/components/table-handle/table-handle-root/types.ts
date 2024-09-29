import type {
  EmptyObject,
  EventDeclarations,
  PropDeclarations,
} from '@aria-ui/core'
import type { Editor } from '@prosekit/core'

export interface TableHandleRootProps {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   */
  editor: Editor | null
}

export const tableHandleRootProps: PropDeclarations<TableHandleRootProps> = {
  editor: { default: null },
}

export interface TableHandleRootEvents extends EmptyObject {}

export const tableHandleRootEvents: EventDeclarations<TableHandleRootEvents> =
  {}
