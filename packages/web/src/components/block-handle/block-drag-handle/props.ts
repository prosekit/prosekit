import type { Editor } from '@prosekit/core'

/**
 * @deprecated Use `BlockHandleDraggableProps` instead.
 */
export interface BlockDragHandleProps {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   */
  editor: Editor | null
}

export const defaultBlockDragHandleProps = Object.freeze({
  editor: null,
}) satisfies BlockDragHandleProps
