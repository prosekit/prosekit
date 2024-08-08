import type { VirtualElement } from '@floating-ui/dom'
import {
  union,
  defineDOMEventHandler,
  type FindParentNodeResult,
} from '@prosekit/core'
import { type EditorView } from '@prosekit/pm/view'

import { throttle } from '../../../utils/throttle'
import type { CellAxisWithPos } from '../context'
import { findTable, getCellAxisByMouseEvent, rowFirstCellPos } from '../utils'

export type ElementHoverHandler = (
  reference: VirtualElement | null,
  table: FindParentNodeResult | null,
  cellAxis: CellAxisWithPos | null,
) => void

export function defineElementHoverHandler(handler: ElementHoverHandler) {
  const handlePointerEvent = (view: EditorView, event: PointerEvent) => {
    const cellAxis = getCellAxisByMouseEvent(view, event)
    if (!cellAxis) return handler(null, null, null)
    const table = findTable(cellAxis?.$cell)
    if (!table) return handler(null, null, null)
    const pos = rowFirstCellPos(table.node, table.pos, cellAxis.row)
    const columnCellDom = view.nodeDOM(pos) as HTMLElement
    if (!columnCellDom) return handler(null, null, null)

    return handler(columnCellDom, table, cellAxis)
  }

  return union(
    defineDOMEventHandler('pointermove', throttle(handlePointerEvent, 200)),
    defineDOMEventHandler('pointerout', handlePointerEvent),
    defineDOMEventHandler('keypress', () => handler(null, null, null)),
  )
}
