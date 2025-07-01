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
import { getTableDOMByPos, getTargetFirstCellDOM } from '../utils'

import type { TableHandleDndIndicatorProps } from './types'

const HANDLE_WIDTH = 2

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

  const directionSignal = createComputed(() => {
    const context = dndContext.get()
    return context.direction
  })

  const draggingSignal = createComputed(() => {
    const context = dndContext.get()
    return context.dragging
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

    Object.assign(host.style, {
      display: dragging ? 'block' : 'none',
      pointerEvents: 'none',
      position: 'absolute',
    })

    if (!dragging) return

    const draggingIndex = draggingIndexSignal.get()
    const { view } = editorInstance

    const cellPos = rootContext.peek()?.cellPos
    if (cellPos == null) return
    const table = getTableDOMByPos(view, cellPos)
    if (!table) return
    const cell = getTargetFirstCellDOM(table, draggingIndex, direction)
    if (!cell) return

    const tableRect = table.getBoundingClientRect()

    if (direction === 'col') {
      Object.assign(host.style, {
        width: `${HANDLE_WIDTH}px`,
        height: `${tableRect.height}px`,
      })
    } else {
      Object.assign(host.style, {
        width: `${tableRect.width}px`,
        height: `${HANDLE_WIDTH}px`,
      })
    }

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

    const offsetParent = table.offsetParent

    if (!offsetParent || !(offsetParent instanceof HTMLElement)) return

    const wrapperOffsetTop = offsetParent.offsetTop
    const wrapperOffsetLeft = offsetParent.offsetLeft

    if (direction === 'col') {
      const firstRow = table.querySelector('tr')
      if (!firstRow) return
      const { width } = cell.getBoundingClientRect()
      const { left } = table.getBoundingClientRect()
      const leftGap = wrapperOffsetLeft - left
      const previewLeft = x + leftGap - width / 2
      const previewRight = x + leftGap + width / 2

      const direction = startXSignal.get() > x ? 'left' : 'right'

      const children = Array.from(firstRow.children)
      const col = children.find((col, index) => {
        const boundary = col.getBoundingClientRect()
        let boundaryLeft = boundary.left + leftGap
        let boundaryRight = boundary.right + leftGap

        if (direction === 'right') {
          boundaryLeft = boundaryLeft + boundary.width / 2
          boundaryRight = boundaryRight + boundary.width / 2

          if (boundaryLeft <= previewRight && boundaryRight >= previewRight) {
            return true
          }

          if (index === firstRow.children.length - 1 && previewRight > boundaryRight) {
            return true
          }
        } else {
          boundaryLeft = boundaryLeft - boundary.width / 2
          boundaryRight = boundaryRight - boundary.width / 2

          if (boundaryLeft <= previewLeft && boundaryRight >= previewLeft) {
            return true
          }

          if (index === 0 && previewLeft < boundaryLeft) {
            return true
          }
        }

        return false
      })

      if (col) {
        dndContext.set({
          ...dndContext.peek(),
          droppingIndex: Array.from(firstRow.children).indexOf(col),
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
      const { height } = cell.getBoundingClientRect()
      const { top } = table.getBoundingClientRect()
      const topGap = wrapperOffsetTop - top
      const previewTop = y + topGap - height / 2
      const previewBottom = y + topGap + height / 2

      const direction = startYSignal.get() > y ? 'up' : 'down'

      const rows = Array.from(table.querySelectorAll('tr'))
      const row = rows.find((row, index) => {
        const boundary = row.getBoundingClientRect()
        let boundaryTop = boundary.top + topGap
        let boundaryBottom = boundary.bottom + topGap

        if (direction === 'down') {
          boundaryTop = boundaryTop + boundary.height / 2
          boundaryBottom = boundaryBottom + boundary.height / 2
          if (boundaryTop <= previewBottom && boundaryBottom >= previewBottom) return true
          if (index === rows.length - 1 && previewBottom > boundaryBottom) return true
        } else {
          boundaryTop = boundaryTop - boundary.height / 2
          boundaryBottom = boundaryBottom - boundary.height / 2
          if (boundaryTop <= previewTop && boundaryBottom >= previewTop) return true
          if (index === 0 && previewTop < boundaryTop) return true
        }
        return false
      })

      if (row) {
        dndContext.set({
          ...dndContext.peek(),
          droppingIndex: rows.indexOf(row),
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