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
  const delayFocused: Signal<boolean> = createSignal(initialFocused)

  const extension = defineFocusChangeHandler((value: boolean) => focused.set(value))
  useEditorExtension(host, editor, extension)

  // When the editor DOM element is focused, its DOM selection might also get
  // updated. However, ProseMirror's selection is updated after a 20ms delay
  // (see https://github.com/ProseMirror/prosemirror-view/blob/1.41.3/src/input.ts#L773-L776).
  //
  // To avoid flickering, we delay the focus state for a short period of time
  // before it is set to true.
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
