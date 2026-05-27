import type { EditorView } from '@prosekit/pm/view'
import { useLayoutEffect, useRef } from 'react'

import { useEditorEffect } from '@handlewithcare/react-prosemirror'

export function ViewMountHandler(props: {
  onMount: (view: EditorView) => void
  onUnmount: (view: EditorView) => void
}) {
  const { onMount, onUnmount } = props
  const viewRef = useRef<EditorView | null>(null)

  useEditorEffect((view) => {
    viewRef.current = view as unknown as EditorView
  }, [])

  useLayoutEffect(() => {
    const editorView = viewRef.current
    if (!editorView) {
      return
    }
    onMount(editorView)

    return () => {
      onUnmount(editorView)
    }
  }, [onMount, onUnmount])

  return null
}
