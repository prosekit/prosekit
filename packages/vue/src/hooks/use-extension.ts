import { type Extension } from '@prosekit/core'
import { unref, watchPostEffect, type MaybeRef } from 'vue'

import { useEditor } from './use-editor'

export function useExtension<T extends Extension = Extension>(
  extension: MaybeRef<T>,
) {
  const editor = useEditor()
  watchPostEffect(() => {
    return editor.value.use(unref(extension))
  })
}
