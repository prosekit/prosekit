import type { Editor } from '@prosekit/core'

export interface BlockHandleAddProps {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   */
  editor: Editor | null
}

export const defaultBlockHandleAddProps = Object.freeze({
  editor: null,
}) satisfies BlockHandleAddProps
