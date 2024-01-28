import { Editor, EditorNotFoundError, type Extension } from '@prosekit/core'
import { onDestroy } from 'svelte'
import { type Readable } from 'svelte/store'

import { useEditorContext } from '../contexts/editor-context'

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
  useEditorExtension(options?.editor, extensionStore)
}

function useEditorExtension(
  maybeEditor: Editor | null | undefined,
  extensionStore: Readable<Extension | null>,
) {
  const editorContext = useEditorContext()

  let cleanup: VoidFunction | undefined

  const unsubscribe = extensionStore.subscribe((extension) => {
    cleanup?.()
    cleanup = undefined

    const editor = maybeEditor || editorContext

    if (!editor) {
      throw new EditorNotFoundError()
    }
    if (extension) {
      cleanup = editor.use(extension)
    }
  })

  onDestroy(() => {
    cleanup?.()
    cleanup = undefined
    unsubscribe()
  })
}
