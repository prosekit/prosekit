import type { HostElement } from '@aria-ui/core'
import { defineFocusChangeHandler, type Editor, type FocusChangeHandler } from '@prosekit/core'

import { useEditorExtension } from './use-editor-extension.ts'

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
