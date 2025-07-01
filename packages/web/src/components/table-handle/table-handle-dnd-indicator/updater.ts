import { createComputed, useEffect, type ConnectableElement, type ReadonlySignal } from "@aria-ui/core";
import { computePosition, offset } from "@floating-ui/dom";
import type { Editor } from "@prosekit/core";

import { tableHandleDndContext, tableHandleRootContext } from "../context";
import { getDndRelatedDOMs } from "../dnd";

import { getDragOverColumn, getDragOverRow } from "./calc-drag-over";

const HANDLE_WIDTH = 2

export function useUpdateIndicatorPosition(host: ConnectableElement, editor: ReadonlySignal<Editor | null>): void {
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
    const editorInstance = editor.get()
    if (!editorInstance) return
    const dragging = draggingSignal.get()
    if (!dragging) return

    const { view } = editorInstance
    const { draggingIndex, direction } = dndContext.peek()
    const x = clientXSignal.get()
    const y = clientYSignal.get()

    const relatedDOMs = getDndRelatedDOMs(view, rootContext.peek()?.cellPos, draggingIndex, direction)
    if (!relatedDOMs) return
    const { table, cell } = relatedDOMs

    if (direction === 'col') {
      const direction = startXSignal.get() > x ? 'left' : 'right'
      const dragOverColumn = getDragOverColumn(table, cell, x, direction)

      if (dragOverColumn) {
        const [col, index] = dragOverColumn
        dndContext.set({
          ...dndContext.peek(),
          droppingIndex: index,
        })
        computePosition(col, host, {
          placement: direction === 'left' ? 'left' : 'right',
          middleware: [
            offset(direction === 'left' ? -1 * HANDLE_WIDTH : 0),
          ],
        })
          .then(({ x }) => {
            Object.assign(host.style, {
              left: `${x}px`,
            })
          }).catch(console.error)
      }

      return
    }

    if (direction === 'row') {
      const direction = startYSignal.get() > y ? 'up' : 'down'
      const dragOverRow = getDragOverRow(table, cell, y, direction)

      if (dragOverRow) {
        const [row, index] = dragOverRow
        dndContext.set({
          ...dndContext.peek(),
          droppingIndex: index,
        })
        computePosition(row, host, {
          placement: direction === 'up' ? 'top' : 'bottom',
          middleware: [
            offset(direction === 'up' ? -1 * HANDLE_WIDTH : 0),
          ],
        })
          .then(({ y }) => {
            Object.assign(host.style, {
              top: `${y}px`,
            })
          }).catch(console.error)
      }

      return
    }
  })
}