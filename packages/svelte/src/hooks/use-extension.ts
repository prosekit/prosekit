import { type Extension } from '@prosekit/core'
import { derived, type Readable } from 'svelte/store'

import { useEditor } from './use-editor'

/**
 * Add an extension to the editor.
 *
 * It accepts a store to an optional extension. If the extension is changed, the
 * previous extension will be removed and the new one (if not null) will be
 * added.
 */
export function useExtension<T extends Extension = Extension>(
  extensionStore: Readable<T | null>,
): void {
  const editorStore = useEditor()
  const store = derived([editorStore, extensionStore], (values) => values)
  let cleanup: VoidFunction | null = null
  store.subscribe(([editor, extension]) => {
    cleanup?.()
    cleanup = null
    if (extension) {
      cleanup = editor.use(extension)
    }
  })
}
