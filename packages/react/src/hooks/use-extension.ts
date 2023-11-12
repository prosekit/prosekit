import { type Extension } from '@prosekit/core'
import { useEffect } from 'react'

import { useEditor } from './use-editor'

export function useExtension<T extends Extension = Extension>(extension: T) {
  const editor = useEditor()

  useEffect(() => {
    return editor.use(extension)
  }, [editor, extension])
}
