import type { Editor } from '@prosekit/core'

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
