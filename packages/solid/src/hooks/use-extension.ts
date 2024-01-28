import { Editor, EditorNotFoundError, type Extension } from '@prosekit/core'
import { createEffect, onCleanup, type Accessor } from 'solid-js'

import { useEditorContext } from '../contexts/editor-context'
import type { MaybeAccessor } from '../types'
import { toValue } from '../utils/to-value'

/**
 * Add an extension to the editor.
 */
export function useExtension(
  /**
   * The accessor to an extension to add to the editor. If it changes, the previous
   * extension will be removed and the new one (if not null) will be added.
   */
  extension: Accessor<Extension | null>,
  options?: {
    /**
     * The editor to add the extension to. If not provided, it will use the
     * editor from the nearest `ProseKit` component.
     */
    editor?: MaybeAccessor<Editor>
  },
): void {
  useEditorExtension(options?.editor, extension)
}

function useEditorExtension(
  editorAccessor: MaybeAccessor<Editor> | undefined | null,
  extensionAccessor: Accessor<Extension | null>,
) {
  const editorContext = useEditorContext()

  createEffect(() => {
    const editor = toValue(editorAccessor) || toValue(editorContext)
    const extension = extensionAccessor()

    if (!editor) {
      throw new EditorNotFoundError()
    }
    if (extension) {
      onCleanup(editor.use(extension))
    }
  })
}
