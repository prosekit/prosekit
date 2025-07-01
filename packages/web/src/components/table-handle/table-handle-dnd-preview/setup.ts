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

import type { TableHandleDndPreviewProps } from './types'

export function useTableHandleDndPreview(host: ConnectableElement, { state }: { state: SignalState<TableHandleDndPreviewProps> }): void {
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

  const draggingSingal = createComputed(() => {
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
    host.style.position = 'absolute'
  })

  useEffect(host, () => {
    const editorInstance = editor.get()
    if (!editorInstance) return

    const dragging = draggingSingal.get()
    host.dataset.dragging = dragging.toString()

    Object.assign(host.style, {
      display: dragging ? 'block' : 'none',
      // Make sure drop on preview will trigger drop event on the host
      pointerEvents: 'none',
    })

    if (!dragging) {
      clearPreviewDOM(host)
      return
    }

    const direction = directionSignal.get()
    host.dataset.direction = direction

    const draggingIndex = draggingIndexSignal.get()
    const { view } = editorInstance

    const cellPos = rootContext.peek()?.cellPos
    if (cellPos == null) return
    const table = getTableDOMByPos(view, cellPos)
    if (!table) return
    const cell = getTargetFirstCellDOM(table, draggingIndex, direction)
    if (!cell) return

    createPreviewDOM(table, host, draggingIndex, direction)

    const tableRect = table.getBoundingClientRect()
    const cellRect = cell.getBoundingClientRect()

    if (direction === 'col') {
      Object.assign(host.style, {
        width: `${cellRect.width}px`,
        height: `${tableRect.height}px`,
      })
    } else {
      Object.assign(host.style, {
        width: `${tableRect.width}px`,
        height: `${cellRect.height}px`,
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
    if (!draggingSingal.get()) return

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

    computePosition(
      {
        contextElement: cell,
        getBoundingClientRect: () => {
          const rect = cell.getBoundingClientRect()
          return {
            width: rect.width,
            height: rect.height,
            right: x + rect.width / 2,
            bottom: y + rect.height / 2,
            top: y - rect.height / 2,
            left: x - rect.width / 2,
            x,
            y,
          }
        },
      },
      host,
      {
        placement: direction === 'row' ? 'right' : 'bottom',
      },
    ).then(({ x, y }) => {
      if (direction === 'row') {
        Object.assign(host.style, {
          top: `${y}px`,
        })
      } else {
        Object.assign(host.style, {
          left: `${x}px`,
        })
      }
    }).catch((error) => {
      console.error(error)
    })
  })
}

function clearPreviewDOM(previewRoot: HTMLElement) {
  while (previewRoot.firstChild) {
    previewRoot.removeChild(previewRoot.firstChild)
  }
}

function createPreviewDOM(
  table: HTMLTableElement,
  previewRoot: HTMLElement,
  index: number,
  direction: 'row' | 'col',
) {
  clearPreviewDOM(previewRoot)

  const previewTable = document.createElement('table')
  const previewTableBody = document.createElement('tbody')
  previewTable.appendChild(previewTableBody)
  previewRoot.appendChild(previewTable)

  const rows = table.querySelectorAll('tr')

  if (direction === 'row') {
    const row = rows[index]
    const rowDOM = row.cloneNode(true)
    previewTableBody.appendChild(rowDOM)
  } else {
    rows.forEach((row) => {
      const rowDOM = row.cloneNode(false)
      const cellDOM = row.querySelectorAll('td')[index].cloneNode(true)
      rowDOM.appendChild(cellDOM)
      previewTableBody.appendChild(rowDOM)
    })
  }
}
