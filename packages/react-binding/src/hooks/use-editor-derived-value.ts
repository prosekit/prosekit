import { EditorNotFoundError, type Extension } from '@prosekit/core'
import { useMemo, useSyncExternalStore } from 'react'

import { useEditorContext } from '../contexts/editor-context.ts'
import type { ReactBindingEditor } from '../editor/react-binding-editor.ts'

export interface UseEditorDerivedOptions<E extends Extension = any> {
  editor?: ReactBindingEditor<E>
}

export function useEditorDerivedValue<E extends Extension, Derived>(
  derive: (editor: ReactBindingEditor<E>) => Derived,
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

  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}

function createEditorStore<Derived, E extends Extension = any>(
  editor: ReactBindingEditor<E>,
  derive: (editor: ReactBindingEditor<E>) => Derived,
) {
  let dirty = true
  let derived: Derived

  const subscribe = (onChange: VoidFunction): VoidFunction => {
    return editor.subscribe(() => {
      dirty = true
      onChange()
    })
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
