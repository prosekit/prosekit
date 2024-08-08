import type { VirtualElement } from '@floating-ui/dom'
import {
  defineDOMEventHandler,
  findParentNodeOfType,
  union,
} from '@prosekit/core'
import { isCellSelection } from '@prosekit/extensions/table'
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
  const handlePointerEvent = (view: EditorView) => {
    const { selection } = view.state
    const isCellSel = isCellSelection(selection)
    const { $head } = selection
    const tableCell = findParentNodeOfType('tableCell', $head)

    if (tableCell || isCellSel) {
      if (tableCell) {
        const cellDom = view.nodeDOM(tableCell.pos) as HTMLElement | null
        return handler(cellDom, cellDom, tableCell.node, tableCell.pos)
      }
    }
  }

  return union(
    defineDOMEventHandler('pointermove', throttle(handlePointerEvent, 200)),
    defineDOMEventHandler('pointerout', handlePointerEvent),
    defineDOMEventHandler('keypress', () => handler(null, null, null, null)),
  )
}
