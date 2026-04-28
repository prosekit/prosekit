import type { HostElement } from '@aria-ui/core'
import type { Editor } from '@prosekit/core'

import { useEditorExtension } from '../../hooks/use-editor-extension.ts'
import { prefersReducedMotion } from '../../utils/prefers-reduced-motion.ts'

import { isHoverStateEqual, type HoverState } from './hover-state.ts'
import { defineElementHoverHandler, type ElementHoverHandler } from './pointer-move.ts'

export function useHoverExtension(
  host: HostElement,
  getEditor: () => Editor | null,
  handler: ElementHoverHandler,
): void {
  const invalidTimeoutMs = prefersReducedMotion() ? 0 : 180

  let invalidTimeoutId: ReturnType<typeof setTimeout> | undefined

  let prevHoverState: HoverState | undefined

  const callHandler: ElementHoverHandler = (reference, hoverState) => {
    prevHoverState = hoverState
    handler(reference, hoverState)
  }

  const extension = defineElementHoverHandler((reference, hoverState) => {
    if (hoverState && invalidTimeoutId != null) {
      clearTimeout(invalidTimeoutId)
      invalidTimeoutId = undefined
    }

    if (prevHoverState && hoverState) {
      if (isHoverStateEqual(prevHoverState, hoverState)) {
        return
      }
      callHandler(reference, hoverState)
      return
    }

    if (!prevHoverState && !hoverState) {
      return
    }

    if (!prevHoverState && hoverState) {
      callHandler(reference, hoverState)
      return
    }

    if (prevHoverState && !hoverState) {
      if (invalidTimeoutId != null) {
        return
      }

      // Wait for a short period of time before invalidating the hover state.
      // This ensures smoother animation when the pointer moves between two
      // blocks with a small gap.
      invalidTimeoutId = setTimeout(() => {
        callHandler(reference, undefined)
        invalidTimeoutId = undefined
      }, invalidTimeoutMs)
    }
  })

  useEditorExtension(host, getEditor, extension)
}
