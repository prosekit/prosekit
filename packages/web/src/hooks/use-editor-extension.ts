import { useEffect, type HostElement } from '@aria-ui/core'
import type { Editor, Extension } from '@prosekit/core'

import { queueExtension } from '../queue-extension.ts'

export function useEditorExtension(
  host: HostElement,
  getEditor: () => Editor | null,
  extension: Extension,
): void {
  useEffect(host, () => {
    const editor = getEditor()
    if (editor) {
      return queueExtension(editor, extension)
    }
  })
}
