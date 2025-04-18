import type {
  ConnectableElement,
  ReadonlySignal,
} from '@aria-ui/core'
import {
  defineFocusChangeHandler,
  type Editor,
  type FocusChangeHandler,
} from '@prosekit/core'

import { useEditorExtension } from './use-editor-extension'

/**
 * @internal
 */
export function useEditorFocusChangeEvent(
  host: ConnectableElement,
  editor: ReadonlySignal<Editor | null>,
  handler: FocusChangeHandler,
): void {
  const extension = defineFocusChangeHandler(handler)
  useEditorExtension(host, editor, extension)
}
