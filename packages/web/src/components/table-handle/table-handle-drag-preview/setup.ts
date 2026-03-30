import { useEffect, type ConnectableElement, type SignalState } from '@aria-ui/core'

import { assignStyles } from '../../../utils/assign-styles.ts'
import { useInitDndPosition, type OnInitParams } from '../dnd.ts'

import { clearPreviewDOM, createPreviewDOM } from './render-preview.ts'
import type { TableHandleDragPreviewProps } from './types.ts'
import { useUpdatePreviewPosition } from './updater.ts'

/**
 * @internal
 */
export function useTableHandleDragPreview(host: ConnectableElement, { state }: { state: SignalState<TableHandleDragPreviewProps> }): void {
  const { editor } = state

  useEffect(host, () => {
    assignStyles(host, {
      position: 'absolute',
      // Make sure drop on preview will trigger drop event on the host
      pointerEvents: 'none',
    })
  })

  useInitDndPosition(host, editor, onInitPreviewPosition)

  useUpdatePreviewPosition(host, editor)
}

function onInitPreviewPosition({ host, direction, dragging, table, cell, draggingIndex }: OnInitParams): void {
  assignStyles(host, {
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
    assignStyles(host, {
      width: `${cellRect.width}px`,
      height: `${tableRect.height}px`,
    })
  }

  if (direction === 'row') {
    assignStyles(host, {
      width: `${tableRect.width}px`,
      height: `${cellRect.height}px`,
    })
  }
}
