import { type Extension } from '@prosekit/core'
import { onCleanup, onMount } from 'solid-js'

import { useEditor } from './use-editor'

interface UseExtensionProps<T extends Extension = Extension> {
  extension: T
}

export function useExtension({ extension }: UseExtensionProps) {
  const editor = useEditor()

  onMount(() => {
    const cleanup = editor.use(extension)
    onCleanup(cleanup)
  })
}
