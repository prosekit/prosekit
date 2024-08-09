import type { VirtualElement } from '@floating-ui/dom'
import {
  union,
  defineDOMEventHandler,
  type FindParentNodeResult,
} from '@prosekit/core'
import {
  findTable,
  getCellAxisByMouseEvent,
  getCellIndex,
  TableMap,
  type CellAxis,
} from '@prosekit/extensions/table'
import { EditorView } from '@prosekit/pm/view'

import { throttle } from '../../../utils/throttle'

export type ElementHoverHandler = (
  reference: VirtualElement | null,
  table: FindParentNodeResult | null,
  cellAxis: CellAxis | null,
) => void

export function defineElementHoverHandler(handler: ElementHoverHandler) {
  const handlePointerEvent = (view: EditorView, event: PointerEvent) => {
    const cellAxis = getCellAxisByMouseEvent(view, event)
    if (!cellAxis) return handler(null, null, null)
    const table = findTable(cellAxis?.$cell)
    if (!table) return handler(null, null, null)
    const tableMap = TableMap.get(table.node)
    const cellIndex = getCellIndex(tableMap, 0, cellAxis.col)
    const posInTable = tableMap.map[cellIndex]!
    const pos = table.pos + posInTable + 1
    const columnCellDom = view.nodeDOM(pos) as HTMLElement
    if (!columnCellDom) return handler(null, null, null)

    return handler(columnCellDom, table, {
      col: cellAxis.col,
      row: cellAxis.row,
    })
  }

  return union(
    defineDOMEventHandler('pointermove', throttle(handlePointerEvent, 200)),
    defineDOMEventHandler('pointerout', handlePointerEvent),
    defineDOMEventHandler('keypress', () => handler(null, null, null)),
  )
}
