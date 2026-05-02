import { ProseKitError, type Editor, type Extension } from '@prosekit/core'
import { getContext, hasContext, setContext } from 'svelte'

const key = 'prosekit-svelte-editor-context'

/**
 * @internal
 */
export function setEditorContext(getEditor: () => Editor): void {
  setContext(key, getEditor)
}

/**
 * @internal
 */
export function useEditorContext<E extends Extension>(): Editor<E> | undefined {
  if (hasContext(key)) {
    const context: () => Editor = getContext(key)
    const editor = context()
    if (!editor) {
      throw new ProseKitError('editor should not be empty')
    }
    return editor
  }
}
