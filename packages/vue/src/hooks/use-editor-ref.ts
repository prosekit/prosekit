import { defineEventHandler, Editor, type Extension } from '@prosekit/core'
import {
  onMounted,
  onUnmounted,
  shallowRef,
  triggerRef,
  type ShallowRef,
} from 'vue'

import { useEditor } from './use-editor'

export function useEditorRef<E extends Extension = any>(): ShallowRef<
  Editor<E>
> {
  const editor = useEditor<E>()
  const editorRef = shallowRef<Editor<E>>(editor)

  onMounted(() => {
    const forceUpdate = () => triggerRef(editorRef)
    const dispose = editor.use(defineEventHandler({ update: forceUpdate }))
    onUnmounted(dispose)
  })

  return editorRef
}
