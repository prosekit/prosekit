import {
  useEffect,
  useEventListener,
  type ConnectableElement,
  type SetupOptions,
} from '@aria-ui/core'
import { useMenuTrigger } from '@aria-ui/menu/elements'
import { selectTableRow } from '@prosekit/extensions/table'

import {
  tableHandleDndContext,
  tableHandleRootContext,
} from '../context'
import { useEmptyImage } from '../hooks/use-empty-image'

import type {
  TableHandleRowTriggerEvents,
  TableHandleRowTriggerProps,
} from './types'

/**
 * @internal
 */
export function useTableHandleRowTrigger(
  host: ConnectableElement,
  { state }: SetupOptions<TableHandleRowTriggerProps, TableHandleRowTriggerEvents>,
): void {
  useMenuTrigger(host)

  const context = tableHandleRootContext.consume(host)

  const dndContext = tableHandleDndContext.consume(host)

  useEventListener(host, 'pointerdown', () => {
    const editor = state.editor.peek()
    const cellPos = context.peek()?.cellPos
    if (!editor || !cellPos) return
    editor.exec(selectTableRow({ head: cellPos }))
  })

  useEffect(host, () => {
    host.draggable = true
  })

  const getEmptyImage = useEmptyImage(host)

  useEventListener(host, 'dragstart', (event: DragEvent) => {
    const dataTransfer = event.dataTransfer
    if (dataTransfer) {
      dataTransfer.effectAllowed = 'move'
      const emptyImage = getEmptyImage()
      if (emptyImage) {
        dataTransfer.setDragImage(emptyImage, 0, 0)
      }
    }
    const prev = dndContext.peek()
    const index = context.peek()?.rowIndex

    if (index == null || index < 0) {
      console.warn('[prosekit] Invalid row index for drag operation:', index)
      event.preventDefault()
      return
    }

    dndContext.set({
      ...prev,
      direction: 'row',
      dragging: true,
      draggingIndex: index,
      startX: event.clientX,
      startY: event.clientY,
    })
  })

  useEventListener(host, 'drag', (event) => {
    const prev = dndContext.peek()
    if (event.clientX === 0 && event.clientY === 0) {
      return
    }

    dndContext.set({
      ...prev,
      direction: 'row',
      dragging: true,
      x: event.clientX,
      y: event.clientY,
    })
  })

  useEventListener(host, 'dragend', () => {
    const prev = dndContext.peek()
    dndContext.set({
      ...prev,
      dragging: false,
    })
  })
}
