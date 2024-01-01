import {
  Editor,
  ProseKitError,
  type Extension,
  defineUpdateHandler,
} from '@prosekit/core'
import { useContext, useEffect, useReducer } from 'react'

import { editorContext } from '../contexts/editor-context'

export function useEditor<E extends Extension = any>(options?: {
  update?: boolean
}): Editor<E> {
  const update = options?.update ?? false

  const value = useContext(editorContext)
  if (!value) {
    throw new ProseKitError(
      'useEditor must be used within the ProseKit component',
    )
  }

  const editor = value.editor as Editor<E>
  const forceUpdate = useForceUpdate()

  useEffect(() => {
    if (update) {
      return editor.use(defineUpdateHandler(forceUpdate))
    }
  }, [editor, update, forceUpdate])

  return editor
}

function useForceUpdate() {
  const [, dispatch] = useReducer((x: number) => x + 1, 0)
  return dispatch
}
