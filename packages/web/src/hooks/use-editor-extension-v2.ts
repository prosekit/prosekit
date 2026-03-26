// TODO: Rename to use-editor-extension.ts after all components are migrated to v2
import { useEffect, type HostElement } from '@aria-ui-v2/core'
import type { Editor, Extension } from '@prosekit/core'

export function useEditorExtension(
  host: HostElement,
  getEditor: () => Editor | null,
  extension: Extension,
): void {
  useEffect(host, () => {
    return getEditor()?.use(extension)
  })
}
