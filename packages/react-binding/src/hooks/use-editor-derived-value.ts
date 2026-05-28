import { EditorNotFoundError, type Extension } from '@prosekit/core'
import { useMemo, useSyncExternalStore } from 'react'

import { useEditorContext } from '../contexts/editor-context.ts'
import type { ReactBindingEditor } from '../editor/react-binding-editor.ts'
import { subscribeEditorUpdate } from './subscribe-editor-update.ts'

export interface UseEditorDerivedOptions<E extends Extension = any> {
  editor?: ReactBindingEditor<E>
}

export function useEditorDerivedValue<E extends Extension, Derived>(
  derive: (editor: ReactBindingEditor<E>) => Derived,
  options?: UseEditorDerivedOptions<E>,
): Derived {
  const editorContext = useEditorContext<E>()
  const editor = options?.editor ?? editorContext

  if (!editor) {
    throw new EditorNotFoundError()
  }

  const snapshot = useSyncExternalStore(
    (onStoreChange) => subscribeEditorUpdate(editor, onStoreChange),
    editor.getSnapshot,
    editor.getSnapshot,
  )

  return useMemo(() => derive(editor), [editor, snapshot, derive])
}
