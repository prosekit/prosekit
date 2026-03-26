// TODO: Rename to use-editor-update-event.ts after all components are migrated to v2
import type { HostElement } from '@aria-ui-v2/core'
import { defineUpdateHandler, type Editor, type UpdateHandler } from '@prosekit/core'

import { useEditorExtension } from './use-editor-extension-v2.ts'

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
