import { type Extension } from '@prosekit/core'
import { unref, watchPostEffect, type Ref } from 'vue'

import { useEditor } from './use-editor'

/**
 * Add an extension to the editor.
 *
 * It accepts a ref to an optional extension. If the extension is changed, the
 * previous extension will be removed and the new one (if not null) will be
 * added.
 */
export function useExtension<T extends Extension = Extension>(
  extension: Ref<T | null>,
) {
  const editor = useEditor()
  watchPostEffect((onCleanup) => {
    const ext = unref(extension)
    if (ext) {
      onCleanup(editor.value.use(ext))
    }
  })
}
