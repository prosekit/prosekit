import { type Extension } from '@prosekit/core'
import { useEffect } from 'preact/hooks'

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
  useEffect(() => {
    if (extension) {
      return editor.use(extension)
    }
  }, [editor, extension])
}
