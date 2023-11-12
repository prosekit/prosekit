import {
  ProseKitError,
  type Editor,
} from '@prosekit/core'
import { getContext, hasContext, setContext } from 'svelte'

export interface EditorContext {
  editor: Editor
}

const key = 'prosekit-svelte-editor-context'

export function setEditorContext(editor: Editor): void {
  if (!editor) {
    throw new ProseKitError('editor should not be empty')
  }
  const context: EditorContext = { editor }
  setContext(key, context)
}

export function getEditorContext(): EditorContext {
  if (!hasContext(key)) {
    throw new ProseKitError(
      'Editor context not found. You must call this function inside the ProseKit component',
    )
  }
  return getContext(key)
}


