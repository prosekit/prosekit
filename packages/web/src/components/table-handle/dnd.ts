import {
  createComputed,
  useEffect,
  type ConnectableElement,
  type ReadonlySignal,
} from '@aria-ui/core'
import {
  computePosition,
  offset,
} from '@floating-ui/dom'
import type { Editor } from '@prosekit/core'

import {
  tableHandleDndContext,
  tableHandleRootContext,
} from './context'
import {
  getTableDOMByPos,
  getTargetFirstCellDOM,
} from './utils'

type OnInitParams = {
  direction: 'row' | 'col'
  dragging: boolean
  draggingIndex: number
  table: HTMLTableElement
  cell: HTMLTableCellElement
}

export function useInitDndPosition(
  host: ConnectableElement,
  editor: ReadonlySignal<Editor | null>,
  onInit: (params: OnInitParams) => void,
): void {
  const dndContext = tableHandleDndContext.consume(host)
  const rootContext = tableHandleRootContext.consume(host)

  const draggingSignal = createComputed(() => {
    const context = dndContext.get()
    return context.dragging
  })

  const directionSignal = createComputed(() => {
    const context = dndContext.get()
    return context.direction
  })

  const draggingIndexSignal = createComputed(() => {
    const context = dndContext.get()
    return context.draggingIndex
  })

  useEffect(host, () => {
    const editorInstance = editor.get()
    if (!editorInstance) return

    const dragging = draggingSignal.get()
    const direction = directionSignal.get()

    host.dataset.direction = direction
    host.dataset.dragging = dragging.toString()

    const draggingIndex = draggingIndexSignal.get()
    const { view } = editorInstance

    const cellPos = rootContext.peek()?.cellPos
    if (cellPos == null) return
    const table = getTableDOMByPos(view, cellPos)
    if (!table) return
    const cell = getTargetFirstCellDOM(table, draggingIndex, direction)
    if (!cell) return

    onInit({
      direction,
      dragging,
      draggingIndex,
      table,
      cell,
    })

    if (!dragging) return

    computePosition(cell, host, {
      placement: direction === 'row' ? 'right' : 'bottom',
      middleware: [offset(({ rects }) => {
        if (direction === 'col') {
          return -rects.reference.height
        }

        return -rects.reference.width
      })],
    })
      .then(({ x, y }) => {
        Object.assign(host.style, {
          left: `${x}px`,
          top: `${y}px`,
        })
      })
      .catch((error) => {
        console.error(error)
      })
  })
}
