import { useEffect, type HostElement } from '@aria-ui/core'
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
