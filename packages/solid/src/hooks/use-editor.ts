import {
  Editor,
  ProseKitError,
  defineUpdateHandler,
  type Extension,
  defineMountHandler,
  union,
} from '@prosekit/core'
import { createEffect, createSignal, useContext } from 'solid-js'

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
}): () => Editor<E> {
  const update = options?.update ?? false

  const value = useContext(editorContext)
  if (!value) {
    throw new ProseKitError(
      'useEditor must be used within the ProseKit component',
    )
  }

  const editor = value.editor as Editor<E>
  const [depend, forceUpdate] = useForceUpdate()

  createEffect(() => {
    if (update) {
      const extension = union([
        defineMountHandler(forceUpdate),
        defineUpdateHandler(forceUpdate),
      ])
      return editor.use(extension)
    }
  }, [editor, update, forceUpdate])

  return () => {
    depend()
    return editor
  }
}

function useForceUpdate() {
  return createSignal(undefined, { equals: false })
}
