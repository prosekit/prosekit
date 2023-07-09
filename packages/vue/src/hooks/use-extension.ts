import { Extension } from '@prosekit/core'
import { effect } from 'vue'

import { useEditor } from './use-editor'

interface UseExtensionProps<T extends Extension = Extension> {
  extension: T
}

export function useExtension({ extension }: UseExtensionProps) {
  const editor = useEditor()
  effect(() => editor.use(extension))
}
