import type { EventDeclarations, PropDeclarations } from '@aria-ui/core'
import type { Editor } from '@prosekit/core'

export interface BlockHandleDraggableProps {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   * @hidden
   */
  editor: Editor | null
}

export const blockHandleDraggableProps: PropDeclarations<BlockHandleDraggableProps> =
  {
    editor: { default: null },
  }

export interface BlockHandleDraggableEvents {}

export const blockHandleDraggableEvents: EventDeclarations<BlockHandleDraggableEvents> =
  {}
