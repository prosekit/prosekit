import type { EditorState } from '@prosekit/pm/state'
import { useSyncExternalStore } from 'react'

import { useEditor } from './use-editor.ts'
import { subscribeEditorUpdate } from './subscribe-editor-update.ts'

export function useEditorState(): EditorState {
  const editor = useEditor()
  const snapshot = useSyncExternalStore(
    (onStoreChange) => subscribeEditorUpdate(editor, onStoreChange),
    editor.getSnapshot,
    editor.getSnapshot,
  )

  return snapshot.state
}
