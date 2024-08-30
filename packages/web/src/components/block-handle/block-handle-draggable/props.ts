import type { Editor } from '@prosekit/core'

export interface BlockHandleDraggableProps {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   */
  editor: Editor | null
}

export const defaultBlockHandleDraggableProps = Object.freeze({
  editor: null,
}) satisfies BlockHandleDraggableProps
