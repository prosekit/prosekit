import { type Extension } from '@prosekit/core'
import type { Readable } from 'svelte/store'

import { useEditor } from './use-editor'

export function useExtension<T extends Extension = Extension>(
  extensionStore: Readable<T>,
) {
  const editorStore = useEditor()

  return extensionStore.subscribe((extension) => {
    return editorStore.subscribe((editor) => {
      return editor.use(extension)
    })
  })
}
