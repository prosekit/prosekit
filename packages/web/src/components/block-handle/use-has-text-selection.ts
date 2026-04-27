import { createSignal, type HostElement } from '@aria-ui/core'
import { isTextSelection, type Editor } from '@prosekit/core'

import { useEditorUpdateEvent } from '../../hooks/use-editor-update-event.ts'

export function useHasTextSelection(host: HostElement, getEditor: () => Editor | null): () => boolean {
  const state = createSignal(false)
  useEditorUpdateEvent(host, getEditor, (view) => {
    const { selection } = view.state
    state.set(!selection.empty && isTextSelection(selection))
  })
  return state.get
}
