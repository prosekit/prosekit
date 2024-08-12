import type { ConnectableElement, ReadonlySignal } from '@aria-ui/core'
import { type Editor, defineKeymap, type Keymap } from '@prosekit/core'

import { useEditorExtension } from './use-editor-extension'

export function useKeymap(
  host: ConnectableElement,
  editor: ReadonlySignal<Editor | null>,
  keymap: Keymap,
) {
  const extension = defineKeymap(keymap)
  return useEditorExtension(host, editor, extension)
}
