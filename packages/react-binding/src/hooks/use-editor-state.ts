import type { EditorState } from '@prosekit/pm/state'
import { useSyncExternalStore } from 'react'

import { useEditor } from './use-editor.ts'

export function useEditorState(): EditorState {
  const editor = useEditor()

  return useSyncExternalStore(
    (onStoreChange) => editor.subscribe(() => onStoreChange()),
    () => editor.state,
    () => editor.state,
  )
}
