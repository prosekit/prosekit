import { EditorNotFoundError, type Extension } from '@prosekit/core'
import { useSyncExternalStore } from 'react'

import { useEditorContext } from '../contexts/editor-context.ts'
import type { ReactBindingEditor } from '../editor/react-binding-editor.ts'
import { subscribeEditorUpdate } from './subscribe-editor-update.ts'

export function useEditor<E extends Extension = any>(options?: {
  update?: boolean
}): ReactBindingEditor<E> {
  const update = options?.update ?? false
  const editor = useEditorContext<E>()

  if (!editor) {
    throw new EditorNotFoundError()
  }

  useSyncExternalStore(
    (onStoreChange) => {
      if (!update) {
        return () => {}
      }

      return subscribeEditorUpdate(editor, onStoreChange)
    },
    editor.getSnapshot,
    editor.getSnapshot,
  )

  return editor
}
