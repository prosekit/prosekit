import {
  EditorNotFoundError,
  type Editor,
  type Extension,
} from '@prosekit/core'
import { useEffect } from 'react'

/**
 * @internal
 */
export function useEditorExtension(
  editor: Editor | null | undefined,
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
