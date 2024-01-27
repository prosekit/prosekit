import { Editor, ProseKitError, type Extension } from '@prosekit/core'
import { useEffect } from 'preact/hooks'

import { useEditorContext } from '../contexts/editor-context'

/**
 * Add an extension to the editor.
 */
export function useExtension(
  /**
   * The extension to add to the editor. If it changes, the previous
   * extension will be removed and the new one (if not null) will be added.
   */
  extension: Extension | null,
  options?: {
    /**
     * The editor to add the extension to. If not provided, it will use the
     * editor from the nearest `ProseKit` component.
     */
    editor?: Editor
  },
) {
  const editorContext = useEditorContext()
  useEditorExtension(options?.editor || editorContext, extension)
}

function useEditorExtension(
  editor: Editor | null | undefined,
  extension: Extension | null,
) {
  if (!editor) {
    throw new ProseKitError(
      'Unable to find editor. Pass it as an argument or call this function inside a ProseKit component.',
    )
  }

  useEffect(() => {
    if (extension) {
      return editor.use(extension)
    }
  }, [editor, extension])
}
