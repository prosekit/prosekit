import { EditorNotFoundError, type Extension } from '@prosekit/core'
import { useEffect } from 'react'

import type { ReactBindingEditor } from '../editor/react-binding-editor.ts'

export function useEditorExtension(
  editor: ReactBindingEditor | null | undefined,
  extension: Extension | null,
): void {
  if (!editor) {
    throw new EditorNotFoundError()
  }

  useEffect(() => {
    if (extension) {
      return editor.use(extension)
    }
  }, [editor, extension])
}
