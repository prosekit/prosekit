import {
  useEffect,
  useEventListener,
  type ConnectableElement,
  type SignalState,
} from '@aria-ui/core'
import { useMenuTrigger } from '@aria-ui/menu/elements'
import { selectTableColumn } from '@prosekit/extensions/table'

import {
  tableHandleDndContext,
  tableHandleRootContext,
} from '../context'

import type { TableHandleColumnTriggerProps } from './types'

/**
 * @internal
 */
export function useTableHandleColumnTrigger(
  host: ConnectableElement,
  { state }: { state: SignalState<TableHandleColumnTriggerProps> },
): void {
  useMenuTrigger(host)

  const context = tableHandleRootContext.consume(host)

  const dndContext = tableHandleDndContext.consume(host)

  useEventListener(host, 'pointerdown', () => {
    const editor = state.editor.peek()
    const cellPos = context.peek()?.cellPos
    if (!editor || !cellPos) return
    editor.exec(selectTableColumn({ head: cellPos }))
  })

  useEffect(host, () => {
    host.draggable = true
  })

  useEventListener(host, 'dragstart', (event: DragEvent) => {
    const dataTransfer = event.dataTransfer
    if (dataTransfer) {
      dataTransfer.effectAllowed = 'move'
      const dndPreviewImage = dndContext.peek().dndPreviewImage
      if (dndPreviewImage) {
        dataTransfer.setDragImage(dndPreviewImage, 0, 0)
      }
    }
    const prev = dndContext.peek()
    const index = context.peek()?.colIndex ?? -1

    if (index < 0) {
      console.warn('Invalid row index for drag operation:', index)
      event.preventDefault()
      return
    }

    dndContext.set({
      ...prev,
      direction: 'col',
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
      direction: 'col',
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
