// TODO: Rename to use-editor-typing.ts after all components are migrated to v2
import { createSignal, type HostElement } from '@aria-ui-v2/core'
import { defineDOMEventHandler, union, type Editor } from '@prosekit/core'

import { useEditorExtension } from './use-editor-extension-v2.ts'

export function useEditorTyping(
  host: HostElement,
  getEditor: () => Editor | null,
): () => boolean {
  const typing = createSignal(false)

  const extension = union(
    defineDOMEventHandler('keypress', () => {
      typing.set(true)
    }),
    defineDOMEventHandler('pointermove', () => {
      typing.set(false)
    }),
  )

  useEditorExtension(host, getEditor, extension)

  return typing.get
}
