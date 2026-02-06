import { ProseKitError, type Editor, type Extension } from '@prosekit/core'
import { getContext, hasContext, setContext } from 'svelte'

const key = 'prosekit-svelte-editor-context'

/**
 * @internal
 */
export function setEditorContext(editor: Editor): void {
  if (!editor) {
    throw new ProseKitError('editor should not be empty')
  }
  setContext(key, editor)
}

/**
 * @internal
 */
export function useEditorContext<E extends Extension>(): Editor<E> | undefined {
  if (hasContext(key)) {
    return getContext(key)
  }
}
