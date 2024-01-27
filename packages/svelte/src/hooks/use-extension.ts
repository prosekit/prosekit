import { Editor, ProseKitError, type Extension } from '@prosekit/core'
import { type Readable } from 'svelte/store'

import { getEditorContext } from '../contexts/editor-context'

/**
 * Add an extension to the editor.
 */
export function useExtension<T extends Extension = Extension>(
  /**
   * The store to an extension to add to the editor. If it changes, the previous
   * extension will be removed and the new one (if not null) will be added.
   */
  extensionStore: Readable<T | null>,
  options?: {
    /**
     * The editor to add the extension to. If not provided, it will use the
     * editor from the nearest `ProseKit` component.
     */
    editor?: Editor
  },
): void {
  const editorContext = getEditorContext()
  useEditorExtension(options?.editor ?? editorContext, extensionStore)
}

function useEditorExtension(
  editor: Editor | null | undefined,
  extensionStore: Readable<Extension | null>,
) {
  if (!editor) {
    throw new ProseKitError(
      'Unable to find editor. Pass it as an argument or call this function inside a ProseKit component.',
    )
  }

  extensionStore.subscribe((extension) => {
    if (extension) {
      return editor.use(extension)
    }
  })
}
