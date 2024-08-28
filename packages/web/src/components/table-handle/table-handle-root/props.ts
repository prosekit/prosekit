import type { Editor } from '@prosekit/core'

export interface TableHandleRootProps {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   */
  editor: Editor | null
}

export const defaultTableHandleRootProps = Object.freeze({
  editor: null,
}) satisfies TableHandleRootProps
