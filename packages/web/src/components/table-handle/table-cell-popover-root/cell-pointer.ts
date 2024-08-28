import type { VirtualElement } from '@floating-ui/dom'
import {
  defineDOMEventHandler,
  findParentNodeOfType,
  union,
  type FindParentNodeResult,
} from '@prosekit/core'
import { isCellSelection } from '@prosekit/extensions/table'
import type { EditorView } from '@prosekit/pm/view'
import type { CellSelection } from 'prosemirror-tables'

import { throttle } from '../../../utils/throttle'
import type { CellAxisWithPos } from '../context'
import { getCellAxisByMouseEvent } from '../utils'

export type ElementHoverHandler = (
  reference: VirtualElement | null,
  cellAxis: CellAxisWithPos | null,
  cellSelection: CellSelection | null,
  table: FindParentNodeResult | null,
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
      return handler(cellDom, cellAxis, selection, table)
    }

    return handler(cellDom, cellAxis, null, table)
  }

  return union(
    defineDOMEventHandler('pointermove', throttle(handlePointerEvent, 200)),
    defineDOMEventHandler('pointerout', handlePointerEvent),
    defineDOMEventHandler('keypress', () => handler(null, null, null, null)),
  )
}
