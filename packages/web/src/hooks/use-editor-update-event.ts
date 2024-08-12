import type { ConnectableElement, ReadonlySignal } from '@aria-ui/core'
import type { Editor, UpdateHandler } from '@prosekit/core'
import { defineUpdateHandler } from '@prosekit/core'

import { useEditorExtension } from './use-editor-extension'

/**
 * @internal
 */
export function useEditorUpdateEvent(
  host: ConnectableElement,
  editor: ReadonlySignal<Editor | null>,
  handler: UpdateHandler,
) {
  const extension = defineUpdateHandler(handler)
  useEditorExtension(host, editor, extension)
}
