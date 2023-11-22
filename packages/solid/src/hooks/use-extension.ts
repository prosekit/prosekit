import { type Extension } from '@prosekit/core'
import { createEffect, onCleanup } from 'solid-js'

import { useEditor } from './use-editor'

/**
 * Add an extension to the editor.
 *
 * It accepts an optional extension. If the extension is changed, the previous
 * extension will be removed and the new one (if not null) will be added.
 */
export function useExtension<T extends Extension = Extension>(
  extension: T | null,
) {
  const editor = useEditor()

  createEffect(() => {
    if (extension) {
      onCleanup(editor().use(extension))
    }
  })
}
