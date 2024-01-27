import { Editor, ProseKitError, type Extension } from '@prosekit/core'
import { createEffect, onCleanup, type Accessor } from 'solid-js'

import { useEditorContext } from '../contexts/editor-context'

/**
 * Add an extension to the editor.
 */
export function useExtension(
  /**
   * The accessor to an extension to add to the editor. If it changes, the previous
   * extension will be removed and the new one (if not null) will be added.
   */
  extension: () => Extension | null,
  options?: {
    /**
     * The editor to add the extension to. If not provided, it will use the
     * editor from the nearest `ProseKit` component.
     */
    editor?: Editor
  },
): void {
  const editorContext = useEditorContext()
  const extensionAccessor: Accessor<Extension | null> = extension
  useEditorExtension(options?.editor || editorContext, extensionAccessor)
}

function useEditorExtension(
  editor: Editor | null | undefined,
  extensionAccessor: Accessor<Extension | null>,
) {
  if (!editor) {
    throw new ProseKitError(
      'Unable to find editor. Pass it as an argument or call this function inside a ProseKit component.',
    )
  }

  createEffect(() => {
    const extension = extensionAccessor()
    if (extension) {
      onCleanup(editor.use(extension))
    }
  })
}
