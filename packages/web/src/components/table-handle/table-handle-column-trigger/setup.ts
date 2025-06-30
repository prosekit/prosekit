import {
  useEffect,
  useEventListener,
  type ConnectableElement,
  type SignalState,
} from '@aria-ui/core'
import { useMenuTrigger } from '@aria-ui/menu/elements'
import { selectTableColumn } from '@prosekit/extensions/table'

import { tableHandleDndContext, tableHandleRootContext } from '../context'

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
    }
    const prev = dndContext.peek()
    const index = context.peek()?.colIndex ?? -1;
    dndContext.set({
      ...prev,
      direction: 'vertical',
      dragging: true,
      draggingIndex: index,
    })
  })

  useEventListener(host, 'drag', (event) => {
    const prev = dndContext.peek()
    dndContext.set({
      ...prev,
      direction: 'vertical',
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
