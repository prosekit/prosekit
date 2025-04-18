import {
  EditorNotFoundError,
  type Editor,
  type Extension,
} from '@prosekit/core'
import { onMount } from 'svelte'
import type { Readable } from 'svelte/store'

import { useEditorContext } from '../contexts/editor-context'

/**
 * @internal
 */
export function useEditorExtension(
  maybeEditor: Editor | null | undefined,
  extensionStore: Readable<Extension | null>,
): void {
  const editorContext = useEditorContext()

  onMount(() => {
    let cleanup: VoidFunction | undefined
    let unsubscribe: VoidFunction | undefined

    unsubscribe = extensionStore.subscribe((extension) => {
      cleanup?.()
      cleanup = undefined

      const editor = maybeEditor || editorContext

      if (!editor) {
        throw new EditorNotFoundError()
      }
      if (extension) {
        cleanup = editor.use(extension)
      }
    })

    return () => {
      cleanup?.()
      cleanup = undefined
      unsubscribe?.()
      unsubscribe = undefined
    }
  })
}
