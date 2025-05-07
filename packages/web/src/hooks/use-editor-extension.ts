import {
  useEffect,
  type ConnectableElement,
  type ReadonlySignal,
} from '@aria-ui/core'
import type {
  Editor,
  Extension,
} from '@prosekit/core'

export function useEditorExtension(
  host: ConnectableElement,
  editor: ReadonlySignal<Editor | null>,
  extension: Extension,
): void {
  useEffect(host, () => {
    return editor.get()?.use(extension)
  })
}
