// TODO: Rename to use-keymap.ts after all components are migrated to v2
import type { HostElement } from '@aria-ui-v2/core'
import { defineKeymap, type Editor, type Keymap } from '@prosekit/core'

import { useEditorExtension } from './use-editor-extension-v2.ts'

export function useKeymap(
  host: HostElement,
  getEditor: () => Editor | null,
  keymap: Keymap,
): void {
  const extension = defineKeymap(keymap)
  useEditorExtension(host, getEditor, extension)
}
