import {
  defineMountHandler,
  defineUpdateHandler,
  union,
  type Editor,
  type Extension,
} from '@prosekit/core'
import { onDestroy, onMount } from 'svelte'
import { readonly, writable, type Readable } from 'svelte/store'

import { getEditorContext } from '../contexts/editor-context'

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
}): Readable<Editor<E>> {
  const update = options?.update ?? false
  const editor = getEditorContext().editor as Editor<E>

  const editorStore = writable(editor)

  if (update) {
    onMount(() => {
      const forceUpdate = () => {
        editorStore.set(editor)
      }
      const extension = union([
        defineMountHandler(forceUpdate),
        defineUpdateHandler(forceUpdate),
      ])
      const dispose = editor.use(extension)
      onDestroy(dispose)
    })
  }

  return readonly(editorStore)
}
