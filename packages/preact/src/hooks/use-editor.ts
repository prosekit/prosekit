import { Editor, type Extension, ProseKitError } from '@prosekit/core'
import { useContext } from 'preact/hooks'

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
