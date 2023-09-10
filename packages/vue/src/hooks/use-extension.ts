import { type Extension } from '@prosekit/core'
import { onMounted, onUnmounted } from 'vue'

import { useEditor } from './use-editor'

interface UseExtensionProps<T extends Extension = Extension> {
  extension: T
}

export function useExtension({ extension }: UseExtensionProps) {
  const editor = useEditor()
  onMounted(() => {
    const dispose = editor.use(extension)
    onUnmounted(dispose)
  })
}
