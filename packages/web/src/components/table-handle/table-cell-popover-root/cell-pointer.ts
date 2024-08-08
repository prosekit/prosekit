import type { VirtualElement } from '@floating-ui/dom'
import {
  defineDOMEventHandler,
  findParentNodeOfType,
  union,
} from '@prosekit/core'
import {
  cellAround,
  isCellSelection,
  TableMap,
} from '@prosekit/extensions/table'
import type { ProseMirrorNode } from '@prosekit/pm/model'
import type { EditorView } from '@prosekit/pm/view'

import { throttle } from '../../../utils/throttle'

export type ElementHoverHandler = (
  reference: VirtualElement | null,
  element: HTMLElement | null,
  node: ProseMirrorNode | null,
  pos: number | null,
) => void

export function defineElementHoverHandler(handler: ElementHoverHandler) {
  const handlePointerEvent = (view: EditorView, event: PointerEvent) => {
    // const { selection } = view.state
    const pos = view.posAtCoords({
      top: event.clientY,
      left: event.clientX,
    })?.inside
    if (pos == null || pos < 0) {
      handler(null, null, null, null)
      return
    }

    const $pos = view.state.doc.resolve(pos)

    const tableCell = findParentNodeOfType(
      ['tableCell', 'tableHeaderCell'],
      $pos,
    )

    if (tableCell) {
        const cellDom = view.nodeDOM(tableCell.pos) as HTMLElement | null
        return handler(cellDom, cellDom, tableCell.node, tableCell.pos)
      
    }

    // if (tableResult) {
    //   const isCellSel = isCellSelection(selection)
    //   if (!isCellSel) {
    //     const { node } = tableResult
    //     const table = TableMap.get(node)
    //     const $cell = cellAround($head)
    //     if (!$cell) return
    //     const cell = table.findCell($cell.pos)
    //     console.log(cell)
    //   }
    // }
  }

  return union(
    defineDOMEventHandler('pointermove', throttle(handlePointerEvent, 200)),
    defineDOMEventHandler('pointerout', handlePointerEvent),
    defineDOMEventHandler('keypress', () => handler(null, null, null, null)),
  )
}
