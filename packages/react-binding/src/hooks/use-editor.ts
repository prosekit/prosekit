import { defineMountHandler, defineUpdateHandler, EditorNotFoundError, union, type Extension } from '@prosekit/core'
import { useEffect, useReducer } from 'react'

import { useEditorContext } from '../contexts/editor-context.ts'
import type { ReactBindingEditor } from '../editor/react-binding-editor.ts'

/**
 * Retrieves the editor instance from the nearest ProseKit component.
 *
 * By default this hook does **not** subscribe to editor state changes
 * and will not trigger a re-render when the state updates. To opt in,
 * pass `{ update: true }`.
 *
 * Note that the returned editor reference is always the same instance.
 * Use {@link useEditorState} or {@link useEditorDerivedValue} if you need
 * to read the current state and re-render when it changes.
 */
export function useEditor<E extends Extension = any>(options?: {
  /**
   * Whether to update the component when the editor is mounted or editor
   * state is updated.
   *
   * @default false
   */
  update?: boolean
}): ReactBindingEditor<E> {
  const update = options?.update ?? false

  const editor = useEditorContext<E>()
  if (!editor) {
    throw new EditorNotFoundError()
  }

  const forceUpdate = useForceUpdate()

  useEffect(() => {
    if (update) {
      const extension = union(
        defineMountHandler(forceUpdate),
        defineUpdateHandler(forceUpdate),
      )
      return editor.use(extension)
    }
  }, [editor, update, forceUpdate])

  return editor
}

function useForceUpdate() {
  const [, dispatch] = useReducer((x: number) => x + 1, 0)
  return dispatch
}
