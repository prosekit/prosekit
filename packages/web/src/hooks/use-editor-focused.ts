import {
  createSignal,
  type ConnectableElement,
  type ReadonlySignal,
} from '@aria-ui/core'
import {
  defineFocusChangeHandler,
  type Editor,
} from '@prosekit/core'

import { useEditorExtension } from './use-editor-extension'

/**
 * @internal
 */
export function useEditorFocused(
  host: ConnectableElement,
  editor: ReadonlySignal<Editor | null>,
): ReadonlySignal<boolean> {
  const focused = createSignal(editor.get()?.focused ?? false)
  const extension = defineFocusChangeHandler((value: boolean) => focused.set(value))
  useEditorExtension(host, editor, extension)
  return focused
}
