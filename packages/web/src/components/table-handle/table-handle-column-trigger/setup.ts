import { useEffect, useEventListener, type ConnectableElement, type SetupOptions } from '@aria-ui/core'
import { useMenuTrigger } from '@aria-ui/menu/elements'
import { selectTableColumn } from '@prosekit/extensions/table'

import { tableHandleDndContext, tableHandleRootContext } from '../context.ts'
import { useEmptyImage } from '../hooks/use-empty-image.ts'

import type { TableHandleColumnTriggerEvents, TableHandleColumnTriggerProps } from './types.ts'

/**
 * @internal
 */
export function useTableHandleColumnTrigger(
  host: ConnectableElement,
  { state }: SetupOptions<TableHandleColumnTriggerProps, TableHandleColumnTriggerEvents>,
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

  const getEmptyImage = useEmptyImage(host)

  useEventListener(host, 'dragstart', (event: DragEvent) => {
    const dataTransfer = event.dataTransfer
    if (dataTransfer) {
      dataTransfer.effectAllowed = 'move'
      const emptyImage = getEmptyImage()
      if (emptyImage) {
        dataTransfer.setDragImage(emptyImage, 0, 0)
      }
      dataTransfer.setData('application/x-prosekit-table-handle-drag', '')
    }
    const prev = dndContext.peek()
    const index = context.peek()?.colIndex

    if (index == null || index < 0) {
      console.warn('[prosekit] Invalid column index for drag operation:', index)
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
}
