import {
  createSignal,
  useEffect,
  type ConnectableElement,
  type ReadonlySignal,
  type Signal,
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
  const initialFocused: boolean = editor.get()?.focused ?? false
  const focused: Signal<boolean> = createSignal(initialFocused)
  const extension = defineFocusChangeHandler((value: boolean) => focused.set(value))
  useEditorExtension(host, editor, extension)

  const delayFocused: Signal<boolean> = createSignal(false)

  // When the editor is focused, its selection might change, which would cause
  // some other changes to the editor like decorations to be updated. To avoid
  // flickering when the editor is focused, we delay the focus state for a short
  // period of time before it is set to true.
  useEffect(host, () => {
    if (focused.get()) {
      const id = setTimeout(() => {
        delayFocused.set(true)
      }, 50)
      return () => clearTimeout(id)
    } else {
      delayFocused.set(false)
    }
  })

  return delayFocused
}
