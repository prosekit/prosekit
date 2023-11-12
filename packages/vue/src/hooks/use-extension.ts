import { type Extension } from '@prosekit/core'
import { onMounted, onUnmounted, watchEffect, type MaybeRef, unref } from 'vue'

import { useEditor } from './use-editor'

export function useExtension<T extends Extension = Extension>(
  extension: MaybeRef<T>,
) {
  const editor = useEditor()
  watchEffect(() => {
    return editor.value.use(unref(extension))
  })
}
