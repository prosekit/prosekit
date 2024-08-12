import {
  ProseKitError,
  defineMountHandler,
  defineUpdateHandler,
  union,
  type Editor,
  type Extension,
} from '@prosekit/core'
import { onMount } from 'svelte'
import { readonly, writable, type Readable } from 'svelte/store'

import { useEditorContext } from '../contexts/editor-context'

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
  const editor = useEditorContext<E>()

  if (!editor) {
    throw new ProseKitError(
      'useEditor must be used within the ProseKit component',
    )
  }

  const editorStore = writable(editor)

  if (update) {
    onMount(() => {
      const forceUpdate = () => {
        editorStore.set(editor)
      }
      const extension = union(
        defineMountHandler(forceUpdate),
        defineUpdateHandler(forceUpdate),
      )
      return editor.use(extension)
    })
  }

  return readonly(editorStore)
}
