import { Editor, ProseKitError, type Extension } from '@prosekit/core'
import { createEffect, onCleanup, type Accessor } from 'solid-js'

import type { MaybeAccessor } from '..'
import { useEditorContext } from '../contexts/editor-context'
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
  createEffect(() => {
    const editor = toValue(editorAccessor) || useEditorContext()
    const extension = extensionAccessor()

    if (!editor) {
      throw new ProseKitError(
        'Unable to find editor. Pass it as an argument or call this function inside a ProseKit component.',
      )
    }
    if (extension) {
      onCleanup(editor.use(extension))
    }
  })
}
