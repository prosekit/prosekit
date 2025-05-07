import {
  EditorNotFoundError,
  type Editor,
  type Extension,
} from '@prosekit/core'
import {
  createEffect,
  onCleanup,
  type Accessor,
} from 'solid-js'

import { useEditorContext } from '../contexts/editor-context'
import type { MaybeAccessor } from '../types'
import { toValue } from '../utils/to-value'

/**
 * @internal
 */
export function useEditorExtension(
  editorAccessor: MaybeAccessor<Editor> | undefined | null,
  extensionAccessor: Accessor<Extension | null>,
): void {
  const editorContext = useEditorContext()

  createEffect(() => {
    const editor = toValue(editorAccessor) || toValue(editorContext)
    const extension = extensionAccessor()

    if (!editor) {
      throw new EditorNotFoundError()
    }
    if (extension) {
      onCleanup(editor.use(extension))
    }
  })
}
