import {
  defineFocusChangeHandler,
  defineMountHandler,
  defineUnmountHandler,
  defineUpdateHandler,
  EditorNotFoundError,
  union,
  type Editor,
  type Extension,
} from '@prosekit/core'
import {
  useMemo,
  useSyncExternalStore,
} from 'react'

import { useEditorContext } from '../contexts/editor-context'

export interface UseEditorDerivedOptions<E extends Extension = any> {
  /**
   * The editor to add the extension to. If not provided, it will use the
   * editor from the nearest `ProseKit` component.
   */
  editor?: Editor<E>
}

/**
 * @public
 */
export function useDerivedValue<Derived, E extends Extension = any>(
  /**
   * A function that receives the editor instance and returns a derived value.
   *
   * It will be called whenever the editor's state changes, or when it mounts,
   * unmounts, gains focus, or loses focus.
   *
   * This function should be memoized.
   */
  derive: (editor: Editor<E>) => Derived,
  options?: UseEditorDerivedOptions<E>,
): Derived {
  const editorContext = useEditorContext<E>()
  const editor = options?.editor ?? editorContext
  if (!editor) {
    throw new EditorNotFoundError()
  }

  const [subscribe, getSnapshot] = useMemo(() => {
    return createEditorStore(editor, derive)
  }, [editor, derive])

  return useSyncExternalStore(subscribe, getSnapshot)
}

function createEditorStore<Derived, E extends Extension = any>(editor: Editor<E>, derive: (editor: Editor<E>) => Derived) {
  let dirty = true
  let derived: Derived

  const subscribe = (onChange: VoidFunction): VoidFunction => {
    const handleChange = () => {
      dirty = true
      onChange()
    }
    const extension = union(
      defineUpdateHandler(handleChange),
      defineMountHandler(handleChange),
      defineUnmountHandler(handleChange),
      defineFocusChangeHandler(handleChange),
    )
    return editor.use(extension)
  }

  const getSnapshot = () => {
    if (dirty) {
      dirty = false
      derived = derive(editor)
    }
    return derived
  }

  return [subscribe, getSnapshot] as const
}
