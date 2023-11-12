import {
  defineUpdateHandler,
  type Editor,
  type Extension,
} from '@prosekit/core'
import { onDestroy, onMount } from 'svelte'
import { readonly, writable, type Readable } from 'svelte/store'

import { getEditorContext } from '../contexts/editor-context'

export function useEditor<E extends Extension = any>(options?: {
  update?: boolean
}): Readable<Editor<E>> {
  const update = options?.update ?? false
  const editor = getEditorContext().editor as Editor<E>

  const editorStore = writable(editor)

  if (update) {
    onMount(() => {
      const forceUpdate = () => {
        editorStore.set(editor)
      }
      const dispose = editor.use(defineUpdateHandler(forceUpdate))
      onDestroy(dispose)
    })
  }

  return readonly(editorStore)
}
