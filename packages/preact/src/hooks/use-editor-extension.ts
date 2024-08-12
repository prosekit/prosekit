import {
  type Editor,
  EditorNotFoundError,
  type Extension,
} from '@prosekit/core'
import { useEffect } from 'preact/hooks'

/**
 * @internal
 */
export function useEditorExtension(
  editor: Editor | null | undefined,
  extension: Extension | null,
) {
  if (!editor) {
    throw new EditorNotFoundError()
  }

  useEffect(() => {
    if (extension) {
      return editor.use(extension)
    }
  }, [editor, extension])
}
