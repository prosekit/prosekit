// TODO: Rename to use-editor-focus-event.ts after all components are migrated to v2
import type { HostElement } from '@aria-ui-v2/core'
import { defineFocusChangeHandler, type Editor, type FocusChangeHandler } from '@prosekit/core'

import { useEditorExtension } from './use-editor-extension-v2.ts'

/**
 * @internal
 */
export function useEditorFocusChangeEvent(
  host: HostElement,
  getEditor: () => Editor | null,
  handler: FocusChangeHandler,
): void {
  const extension = defineFocusChangeHandler(handler)
  useEditorExtension(host, getEditor, extension)
}
