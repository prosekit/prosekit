import { createSignal, useEffect, type HostElement } from '@aria-ui/core'
import type { Editor } from '@prosekit/core'

import { getSafeEditorView } from '../utils/get-safe-editor-view.ts'

/**
 * Detect if the user is selecting text inside the editor, in which case some
 * components should be disabled or hidden.
 */
export function useSelecting(
  host: HostElement,
  getEditor: () => Editor | null,
  getEnabled: () => boolean,
): () => boolean {
  const selecting = createSignal(false)
  const isPointerDown = createSignal(false)

  useEffect(host, () => {
    if (!getEnabled()) return

    const view = getSafeEditorView(getEditor())
    if (!view) return

    const { dom, root } = view
    if (!root) return

    const handlePointerDown = () => {
      selecting.set(true)
      isPointerDown.set(true)
    }
    const handlePointerUp = () => {
      isPointerDown.set(false)
    }
    const handleMouseMove = () => {
      if (!isPointerDown.get()) {
        selecting.set(false)
      }
    }

    dom.addEventListener('pointerdown', handlePointerDown)
    root.addEventListener('pointerup', handlePointerUp)
    root.addEventListener('pointermove', handleMouseMove)

    return () => {
      dom.removeEventListener('pointerdown', handlePointerDown)
      root.removeEventListener('pointerup', handlePointerUp)
      root.removeEventListener('pointermove', handleMouseMove)
    }
  })

  return selecting.get
}
