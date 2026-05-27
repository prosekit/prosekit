import { EditorNotFoundError, type Extension } from '@prosekit/core'
import { useEffect, useReducer } from 'react'

import { useEditorContext } from '../contexts/editor-context.ts'
import type { ReactBindingEditor } from '../editor/react-binding-editor.ts'

export function useEditor<E extends Extension = any>(options?: {
  update?: boolean
}): ReactBindingEditor<E> {
  const update = options?.update ?? false
  const editor = useEditorContext<E>()

  if (!editor) {
    throw new EditorNotFoundError()
  }

  const forceUpdate = useForceUpdate()

  useEffect(() => {
    if (!update) {
      return
    }

    return editor.subscribe(() => {
      forceUpdate()
    })
  }, [editor, update, forceUpdate])

  return editor
}

function useForceUpdate() {
  const [, dispatch] = useReducer((x: number) => x + 1, 0)
  return dispatch
}
