import {
  createComputed,
  useEffect,
  type ConnectableElement,
  type SignalState,
} from '@aria-ui/core'
import {
  computePosition,
  offset,
} from '@floating-ui/dom'

import {
  tableHandleDndContext,
  tableHandleRootContext,
} from '../context'
import { useInitDndPosition } from '../dnd'
import {
  getTableDOMByPos,
  getTargetFirstCellDOM,
} from '../utils'

import { getDragOverColumn, getDragOverRow } from './calc-drag-over'
import type { TableHandleDndIndicatorProps } from './types'

const HANDLE_WIDTH = 2

/**
 * @internal
 */
export function useTableHandleDndIndicator(host: ConnectableElement, { state }: { state: SignalState<TableHandleDndIndicatorProps> }): void {
  const { editor } = state
  const dndContext = tableHandleDndContext.consume(host)
  const rootContext = tableHandleRootContext.consume(host)

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

  const draggingSignal = createComputed(() => {
    const context = dndContext.get()
    return context.dragging
  })

  useEffect(host, () => {
    Object.assign(host.style, {
      pointerEvents: 'none',
      position: 'absolute',
    })
  });

  useInitDndPosition(host, editor, ({ direction, dragging, table }) => {
    Object.assign(host.style, {
      display: dragging ? 'block' : 'none',
    })

    const tableRect = table.getBoundingClientRect()

    if (direction === 'col') {
      Object.assign(host.style, {
        width: `${HANDLE_WIDTH}px`,
        height: `${tableRect.height}px`,
      })
    }

    if (direction === 'row') {
      Object.assign(host.style, {
        width: `${tableRect.width}px`,
        height: `${HANDLE_WIDTH}px`,
      })
    }
  });

  useEffect(host, () => {
    const editorInstance = editor.get()
    if (!editorInstance) return
    const dragging = draggingSignal.get()
    if (!dragging) return

    const { view } = editorInstance
    const { draggingIndex, direction } = dndContext.peek()
    const x = clientXSignal.get()
    const y = clientYSignal.get()

    const cellPos = rootContext.peek()?.cellPos
    if (cellPos == null) return
    const table = getTableDOMByPos(view, cellPos)
    if (!table) return
    const cell = getTargetFirstCellDOM(table, draggingIndex, direction)
    if (!cell) return

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

  useEffect(host, () => {
    if (!draggingSignal.get()) return
    const onDrop = () => {
      const editorInstance = editor.peek()
      if (!editorInstance) return
      const { droppingIndex, draggingIndex, direction } = dndContext.peek()
      if (direction === 'row') {
        editorInstance.commands.moveTableRow({
          origin: draggingIndex,
          target: droppingIndex,
        })
        return
      }
      if (direction === 'col') {
        editorInstance.commands.moveTableColumn({
          origin: draggingIndex,
          target: droppingIndex,
        })
        return
      }
    }
    document.addEventListener('drop', onDrop)
    return () => {
      document.removeEventListener('drop', onDrop)
    }
  })
}
