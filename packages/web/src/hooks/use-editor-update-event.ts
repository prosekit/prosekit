import type { HostElement } from '@aria-ui/core'
import { defineUpdateHandler, type Editor, type UpdateHandler } from '@prosekit/core'

import { useEditorExtension } from './use-editor-extension.ts'

/**
 * @internal
 */
export function useEditorUpdateEvent(
  host: HostElement,
  getEditor: () => Editor | null,
  handler: UpdateHandler,
): void {
  const extension = defineUpdateHandler(handler)
  useEditorExtension(host, getEditor, extension)
}
