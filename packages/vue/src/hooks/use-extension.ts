import { type Extension } from '@prosekit/core'
import { unref, watchPostEffect, type Ref } from 'vue'

import { useEditor } from './use-editor'

export function useExtension<T extends Extension = Extension>(
  extension: Ref<T>,
) {
  const editor = useEditor()
  watchPostEffect((onCleanup) => {
    onCleanup(editor.value.use(unref(extension)))
  })
}
