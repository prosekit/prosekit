import {
  Editor,
  ProseKitError,
  type Extension,
  defineUpdateHandler,
  union,
  defineMountHandler,
} from '@prosekit/core'
import { useContext, useEffect, useReducer } from 'react'

import { editorContext } from '../contexts/editor-context'

/**
 * Retrieves the editor instance from the nearest ProseKit component.
 *
 * @public
 */
export function useEditor<E extends Extension = any>(options?: {
  /**
   * Whether to update the component when the editor is mounted or editor state
   * is updated.
   *
   * @default false
   */
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
      const extension = union([
        defineMountHandler(forceUpdate),
        defineUpdateHandler(forceUpdate),
      ])
      return editor.use(extension)
    }
  }, [editor, update, forceUpdate])

  return editor
}

function useForceUpdate() {
  const [, dispatch] = useReducer((x: number) => x + 1, 0)
  return dispatch
}
