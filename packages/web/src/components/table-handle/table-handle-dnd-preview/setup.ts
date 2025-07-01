import {
  createComputed,
  useEffect,
  type ConnectableElement,
  type SignalState,
} from '@aria-ui/core'
import {
  computePosition,
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

import { clearPreviewDOM, createPreviewDOM } from './render-preview'
import type { TableHandleDndPreviewProps } from './types'

/**
 * @internal
 */
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

  useEffect(host, () => {
    Object.assign(host.style, {
      position: 'absolute',
      // Make sure drop on preview will trigger drop event on the host
      pointerEvents: 'none',
    })
  })

  useInitDndPosition(host, editor, ({ direction, dragging, table, cell, draggingIndex }) => {
    Object.assign(host.style, {
      display: dragging ? 'block' : 'none',
    })

    if (!dragging) {
      clearPreviewDOM(host)
      return
    }

    createPreviewDOM(table, host, draggingIndex, direction)

    const tableRect = table.getBoundingClientRect()
    const cellRect = cell.getBoundingClientRect()

    if (direction === 'col') {
      Object.assign(host.style, {
        width: `${cellRect.width}px`,
        height: `${tableRect.height}px`,
      })
    }

    if (direction === 'row') {
      Object.assign(host.style, {
        width: `${tableRect.width}px`,
        height: `${cellRect.height}px`,
      })
    }
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
