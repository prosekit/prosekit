import {
  EditorNotFoundError,
  type Editor,
  type Extension,
} from '@prosekit/core'
import {
  toValue,
  watchPostEffect,
  type MaybeRefOrGetter,
} from 'vue'

import { useEditorContext } from '../injection/editor-context'

/**
 * @internal
 */
export function useEditorExtension(
  editorRef: MaybeRefOrGetter<Editor> | null | undefined,
  extensionRef: MaybeRefOrGetter<Extension | null> | null,
): void {
  const editorContext = useEditorContext()

  watchPostEffect((onCleanup) => {
    const editor = toValue(editorRef) || toValue(editorContext)
    const extension = toValue(extensionRef)

    if (!editor) {
      throw new EditorNotFoundError()
    }
    if (extension) {
      onCleanup(editor.use(extension))
    }
  })
}
