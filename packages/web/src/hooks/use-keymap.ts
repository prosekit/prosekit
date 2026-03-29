import type { HostElement } from '@aria-ui/core'
import { defineKeymap, type Editor, type Keymap } from '@prosekit/core'

import { useEditorExtension } from './use-editor-extension.ts'

export function useKeymap(
  host: HostElement,
  getEditor: () => Editor | null,
  keymap: Keymap,
): void {
  const extension = defineKeymap(keymap)
  useEditorExtension(host, getEditor, extension)
}
