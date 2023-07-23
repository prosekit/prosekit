import { Editor, ProseKitError, type Extension } from '@prosekit/core'
import { useContext } from 'solid-js'

import { editorContext } from '../contexts/editor-context'

export function useEditor<E extends Extension = any>(): Editor<E> {
  const value = useContext(editorContext)
  if (!value) {
    throw new ProseKitError(
      'useEditor must be used within the ProseKit component',
    )
  }
  return value.editor as Editor<E>
}
