import type { EditorView } from '@prosekit/pm/view'
import { useEditorEffect } from '@handlewithcare/react-prosemirror'

export function ViewMountHandler(props: {
  onMount: (view: EditorView) => void
  onUnmount: (view: EditorView) => void
}) {
  const { onMount, onUnmount } = props

  useEditorEffect((view) => {
    const editorView = view as unknown as EditorView
    onMount(editorView)

    return () => {
      onUnmount(editorView)
    }
  }, [onMount, onUnmount])

  return null
}
