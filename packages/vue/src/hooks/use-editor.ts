import { defineMountHandler, defineUpdateHandler, ProseKitError, union, type Editor, type Extension } from '@prosekit/core'
import { onMounted, onUnmounted, shallowRef, triggerRef, type ShallowRef } from 'vue'

import { useEditorContext } from '../injection/editor-context'

/**
 * Retrieves the editor instance from the nearest ProseKit component.
 *
 * @public
 */
export function useEditor<E extends Extension = any>(options?: {
  /**
   * Whether to update the component when the editor is mounted or editor state
   * is updated.
   *
   * @default false
   */
  update?: boolean
}): ShallowRef<Editor<E>> {
  const update = options?.update ?? false

  const editor = useEditorContext<E>()
  if (!editor) {
    throw new ProseKitError(
      'useEditor must be used within the ProseKit component',
    )
  }

  const editorRef = shallowRef<Editor<E>>(editor)

  if (update) {
    onMounted(() => {
      const forceUpdate = () => triggerRef(editorRef)
      const extension = union(
        defineMountHandler(forceUpdate),
        defineUpdateHandler(forceUpdate),
      )
      const dispose = editor.use(extension)
      onUnmounted(dispose)
    })
  }

  return editorRef
}
