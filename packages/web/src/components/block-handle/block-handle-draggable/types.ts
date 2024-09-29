import type {
  EmptyObject,
  EventDeclarations,
  PropDeclarations,
} from '@aria-ui/core'
import type { Editor } from '@prosekit/core'

export interface BlockHandleDraggableProps {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   */
  editor: Editor | null
}

export const blockHandleDraggableProps: PropDeclarations<BlockHandleDraggableProps> =
  {
    editor: { default: null },
  }

export interface BlockHandleDraggableEvents extends EmptyObject {}

export const blockHandleDraggableEvents: EventDeclarations<BlockHandleDraggableEvents> =
  {}
