import { EditorNotFoundError, type Editor, type Extension } from '@prosekit/core'
import { queueExtension } from '@prosekit/web'
import { useEffect } from 'preact/hooks'

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
      return queueExtension(editor, extension)
    }
  }, [editor, extension])
}
