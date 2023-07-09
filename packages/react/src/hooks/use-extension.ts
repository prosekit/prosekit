import { Extension } from '@prosekit/core'
import { useEffect } from 'react'

import { useEditor } from './use-editor'

interface UseExtensionProps<T extends Extension = Extension> {
  extension: T
}

export function useExtension({ extension }: UseExtensionProps) {
  const editor = useEditor()
  useEffect(() => editor.use(extension), [editor, extension])
}
