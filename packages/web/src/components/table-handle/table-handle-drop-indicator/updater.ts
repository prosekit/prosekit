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

import { assignStyles } from '../../../utils/assign-styles'
import { getSafeEditorView } from '../../../utils/get-safe-editor-view'
import {
  tableHandleDndContext,
  tableHandleRootContext,
} from '../context'
import { getDndRelatedDOMs } from '../dnd'

import {
  getDragOverColumn,
  getDragOverRow,
} from './calc-drag-over'

export function useUpdateIndicatorPosition(host: ConnectableElement, editor: ReadonlySignal<Editor | null>, handleWidth: number): void {
  const dndContext = tableHandleDndContext.consume(host)
  const rootContext = tableHandleRootContext.consume(host)

  const draggingSignal = createComputed(() => {
    const context = dndContext.get()
    return context.dragging
  })

  const clientXSignal = createComputed(() => {
    const context = dndContext.get()
    return context.x
  })

  const clientYSignal = createComputed(() => {
    const context = dndContext.get()
    return context.y
  })

  const startXSignal = createComputed(() => {
    return dndContext.get().startX
  })

  const startYSignal = createComputed(() => {
    return dndContext.get().startY
  })

  useEffect(host, () => {
    const view = getSafeEditorView(editor.get())
    if (!view) return

    if (!draggingSignal.get()) return

    const { draggingIndex, direction } = dndContext.peek()
    const x = clientXSignal.get()
    const y = clientYSignal.get()

    const relatedDOMs = getDndRelatedDOMs(view, rootContext.peek()?.cellPos, draggingIndex, direction)
    if (!relatedDOMs) return
    const { table } = relatedDOMs

    let cancelled = false
    let cleanup = () => {
      cancelled = true
    }

    if (direction === 'col') {
      const direction = startXSignal.get() > x ? 'left' : 'right'
      const dragOverColumn = getDragOverColumn(table, x)

      if (dragOverColumn) {
        const [col, index] = dragOverColumn
        dndContext.set({ ...dndContext.peek(), droppingIndex: index })
        void computePosition(col, host, {
          placement: direction === 'left' ? 'left' : 'right',
          middleware: [offset(direction === 'left' ? -1 * handleWidth : 0)],
        }).then(({ x }) => {
          if (cancelled) return
          assignStyles(host, { left: `${x}px` })
        })
      }

      return cleanup
    }

    if (direction === 'row') {
      const direction = startYSignal.get() > y ? 'up' : 'down'
      const dragOverRow = getDragOverRow(table, y)

      if (dragOverRow) {
        const [row, index] = dragOverRow
        dndContext.set({ ...dndContext.peek(), droppingIndex: index })
        void computePosition(row, host, {
          placement: direction === 'up' ? 'top' : 'bottom',
          middleware: [offset(direction === 'up' ? -1 * handleWidth : 0)],
        }).then(({ y }) => {
          if (cancelled) return
          assignStyles(host, { top: `${y}px` })
        })
      }

      return cleanup
    }
  })
}
