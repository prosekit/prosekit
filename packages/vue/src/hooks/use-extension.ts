import { Editor, ProseKitError, type Extension } from '@prosekit/core'
import { unref, watchPostEffect, type Ref } from 'vue'

import { useEditorContext } from '../injection/editor-context'

/**
 * Add an extension to the editor.
 */
export function useExtension(
  /**
   * The ref to an extension to add to the editor. If it changes, the previous
   * extension will be removed and the new one (if not null) will be added.
   */
  extension: Ref<Extension | null>,
  options?: {
    /**
     * The editor to add the extension to. If not provided, it will use the
     * editor from the nearest `ProseKit` component.
     */
    editor?: Editor
  },
) {
  const editorContext = useEditorContext()
  useEditorExtension(options?.editor ?? editorContext, extension)
}

function useEditorExtension(
  editor: Editor | null | undefined,
  extensionRef: Ref<Extension | null> | null,
) {
  if (!editor) {
    throw new ProseKitError(
      'Unable to find editor. Pass it as an argument or call this function inside a ProseKit component.',
    )
  }

  watchPostEffect((onCleanup) => {
    const extension = unref(extensionRef)
    if (extension) {
      onCleanup(editor.use(extension))
    }
  })
}
