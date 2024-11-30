import type { VirtualElement } from '@floating-ui/dom'
import {
  defineDOMEventHandler,
  union,
} from '@prosekit/core'
import type { EditorView } from '@prosekit/pm/view'

import { throttle } from '../../../utils/throttle'
import type { HoverState } from '../context'

export type ElementHoverHandler = (
  reference: VirtualElement | null,
  hoverState: HoverState | null,
) => void

export function defineElementHoverHandler(handler: ElementHoverHandler) {
  const handlePointerEvent = (view: EditorView, event: PointerEvent) => {
    const rect = view.dom.getBoundingClientRect()
    const pos = view.posAtCoords({
      top: event.clientY,
      // Use the center of the editor
      left: rect.left + rect.width / 2,
    })?.inside

    if (pos == null || pos < 0) {
      handler(null, null)
      return
    }

    const $pos = view.state.doc.resolve(pos)
    const node = view.state.doc.nodeAt(pos)
    const element = view.nodeDOM(pos) as HTMLElement | null

    // If current node is the first child of its parent node, we want to position the popover
    // relative to the parent node instead of the current node.
    if ($pos.depth >= 1 && $pos.index($pos.depth) === 0) {
      const ancestorPos = $pos.before($pos.depth)
      const node = view.state.doc.nodeAt(ancestorPos)
      const element = view.nodeDOM(ancestorPos) as HTMLElement | null

      if (!element || !node) {
        handler(null, null)
        return
      }

      const reference: VirtualElement = {
        contextElement: element,

        // Get the bounding client rect of the parent node, including its
        // margins.
        getBoundingClientRect: () => {
          const rect = element.getBoundingClientRect()
          const style = window.getComputedStyle(element)

          const marginTop = Number.parseInt(style.marginTop, 10) || 0
          const marginRight = Number.parseInt(style.marginRight, 10) || 0
          const marginBottom = Number.parseInt(style.marginBottom, 10) || 0
          const marginLeft = Number.parseInt(style.marginLeft, 10) || 0

          return {
            top: rect.top - marginTop,
            right: rect.right + marginRight,
            bottom: rect.bottom + marginBottom,
            left: rect.left - marginLeft,
            width: rect.width + marginLeft + marginRight,
            height: rect.height + marginTop + marginBottom,
            x: rect.x - marginLeft,
            y: rect.y - marginTop,
          }
        },
      }

      handler(reference, { element, node, pos: ancestorPos })
      return
    }

    handler(element, element && node && { element, node, pos })
  }

  return union(
    defineDOMEventHandler('pointermove', throttle(handlePointerEvent, 200)),
    defineDOMEventHandler('pointerout', handlePointerEvent),
    defineDOMEventHandler('keypress', () => handler(null, null)),
  )
}
