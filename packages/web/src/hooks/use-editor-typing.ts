import { createSignal, type ConnectableElement, type ReadonlySignal } from '@aria-ui/core'
import { defineDOMEventHandler, union, type Editor } from '@prosekit/core'

import { useEditorExtension } from './use-editor-extension'

export function useEditorTyping(
  host: ConnectableElement,
  editor: ReadonlySignal<Editor | null>,
): ReadonlySignal<boolean> {
  const typing = createSignal(false)

  const handleKeypress = () => {
    typing.set(true)
  }

  const handlePointerMove = () => {
    typing.set(false)
  }

  const extension = union(
    defineDOMEventHandler('keypress', handleKeypress),
    defineDOMEventHandler('pointermove', handlePointerMove),
  )

  useEditorExtension(host, editor, extension)

  return typing
}
