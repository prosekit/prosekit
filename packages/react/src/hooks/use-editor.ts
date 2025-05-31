import {
  defineMountHandler,
  defineUpdateHandler,
  ProseKitError,
  union,
  type Editor,
  type Extension,
} from '@prosekit/core'
import {
  useEffect,
  useReducer,
} from 'react'

import { useEditorContext } from '../contexts/editor-context'

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
   * Note this this option doesn't work with [React
   * compiler](https://react.dev/learn/react-compiler) because the returned
   * editor will be the same instance after state updates. If you're using React
   * compiler, you should use {@link useEditorDerivedValue} instead.
   *
   * @default false
   */
  update?: boolean
}): Editor<E> {
  const update = options?.update ?? false

  const editor = useEditorContext<E>()
  if (!editor) {
    throw new ProseKitError(
      'useEditor must be used within the ProseKit component',
    )
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
