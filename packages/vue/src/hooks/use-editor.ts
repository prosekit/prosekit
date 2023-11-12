import { defineUpdateHandler, Editor, type Extension } from '@prosekit/core'
import {
  onMounted,
  onUnmounted,
  shallowRef,
  triggerRef,
  type ShallowRef,
} from 'vue'

import { injectEditor } from '../injection/editor-injection'

/**
 * Returns a shallow ref to the editor. If `update` is `true`, any editor update
 * will trigger an effect.
 */
export function useEditor<E extends Extension = any>(options?: {
  update?: boolean
}): ShallowRef<Editor<E>> {
  const update = options?.update ?? false

  const editor = injectEditor() as Editor<E>
  const editorRef = shallowRef<Editor<E>>(editor)

  if (update) {
    onMounted(() => {
      const forceUpdate = () => triggerRef(editorRef)
      const dispose = editor.use(defineUpdateHandler(forceUpdate))
      onUnmounted(dispose)
    })
  }

  return editorRef
}
