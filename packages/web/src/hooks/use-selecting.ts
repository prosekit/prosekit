import type { ReadonlySignal } from '@aria-ui/core'
import {
  createSignal,
  useEffect,
  type ConnectableElement,
} from '@aria-ui/core'
import type { Editor } from '@prosekit/core'

import { getSafeEditorView } from '../utils/get-safe-editor-view'

/**
 * Detect if the user is selecting text inside the editor, in which case some
 * components should be disabled or hidden.
 */
export function useSelecting(
  host: ConnectableElement,
  editor: ReadonlySignal<Editor | null>,
  enabled: ReadonlySignal<boolean>,
): ReadonlySignal<boolean> {
  const selecting = createSignal(false)
  const isPointerDown = createSignal(false)

  useEffect(host, () => {
    if (!enabled.get()) {
      return
    }

    const view = getSafeEditorView(editor.peek())
    if (!view) return

    const { dom, root } = view
    if (!root) return

    // When the user starts selecting text, we set the selecting signal to true.
    const handlePointerDown = () => {
      selecting.set(true)
      isPointerDown.set(true)
    }
    const handlePointerUp = () => {
      isPointerDown.set(false)
    }
    // When the user moves the pointer and the pointer is not down, we set the
    // selecting signal to false again.
    const handleMouseMove = () => {
      if (!isPointerDown.get()) {
        selecting.set(false)
      }
    }

    // Only listen to pointer down events on the editor
    dom.addEventListener('pointerdown', handlePointerDown)
    root.addEventListener('pointerup', handlePointerUp)
    root.addEventListener('pointermove', handleMouseMove)

    return () => {
      dom.removeEventListener('pointerdown', handlePointerDown)
      root.removeEventListener('pointerup', handlePointerUp)
      root.removeEventListener('pointermove', handleMouseMove)
    }
  })

  return selecting
}
