import type { ConnectableElement, ReadonlySignal } from '@aria-ui/core'
import { useEffect } from '@aria-ui/core'
import type { Editor, Extension } from '@prosekit/core'

export function useEditorExtension(
  host: ConnectableElement,
  editor: ReadonlySignal<Editor | null>,
  extension: Extension,
) {
  useEffect(host, () => {
    return editor.get()?.use(extension)
  })
}
