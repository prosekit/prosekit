import { Editor, EditorNotFoundError, type Extension } from '@prosekit/core'
import { onDestroy } from 'svelte'
import { type Readable } from 'svelte/store'

import { useEditorContext } from '../contexts/editor-context'

/**
 * @internal
 */
export function useEditorExtension(
  maybeEditor: Editor | null | undefined,
  extensionStore: Readable<Extension | null>,
) {
  const editorContext = useEditorContext()

  let cleanup: VoidFunction | undefined

  const unsubscribe = extensionStore.subscribe((extension) => {
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

  onDestroy(() => {
    cleanup?.()
    cleanup = undefined
    unsubscribe()
  })
}
