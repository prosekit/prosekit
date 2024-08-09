import type { VirtualElement } from '@floating-ui/dom'
import {
  defineDOMEventHandler,
  findParentNodeOfType,
  union,
} from '@prosekit/core'
import {
  CellSelection,
  getCellAxisByMouseEvent,
  isCellSelection,
  type CellAxisWithPos,
} from '@prosekit/extensions/table'
import type { EditorView } from '@prosekit/pm/view'

import { throttle } from '../../../utils/throttle'

export type ElementHoverHandler = (
  reference: VirtualElement | null,
  element: HTMLElement | null,
  cellAxis: CellAxisWithPos | null,
  cellSelection: CellSelection | null,
) => void

export function defineElementHoverHandler(handler: ElementHoverHandler) {
  const handlePointerEvent = (view: EditorView, event: PointerEvent) => {
    const cellAxis = getCellAxisByMouseEvent(view, event)

    if (!cellAxis) {
      handler(null, null, null, null)
      return
    }

    const table = findParentNodeOfType('table', cellAxis.$cell)
    if (!table) {
      handler(null, null, null, null)
      return
    }

    const cellDom = view.nodeDOM(cellAxis.$cell.pos) as HTMLElement | null

    const { selection } = view.state
    if (isCellSelection(selection)) {
      return handler(cellDom, cellDom, cellAxis, selection)
    }

    return handler(cellDom, cellDom, cellAxis, null)
  }

  return union(
    defineDOMEventHandler('pointermove', throttle(handlePointerEvent, 200)),
    defineDOMEventHandler('pointerout', handlePointerEvent),
    defineDOMEventHandler('keypress', () => handler(null, null, null, null)),
  )
}
