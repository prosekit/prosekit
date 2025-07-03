import {
  useEffect,
  type ConnectableElement,
  type SignalState,
} from '@aria-ui/core'

import {
  useInitDndPosition,
  type OnInitParams,
} from '../dnd'

import {
  clearPreviewDOM,
  createPreviewDOM,
} from './render-preview'
import type { TableHandleDragPreviewProps } from './types'
import { useUpdatePreviewPosition } from './updater'

/**
 * @internal
 */
export function useTableHandleDragPreview(host: ConnectableElement, { state }: { state: SignalState<TableHandleDragPreviewProps> }): void {
  const { editor } = state

  useEffect(host, () => {
    host.classList.add('ProseMirror')
    Object.assign(host.style, {
      position: 'absolute',
      // Make sure drop on preview will trigger drop event on the host
      pointerEvents: 'none',
    })
  })

  useInitDndPosition(host, editor, onInitPreviewPosition)

  useUpdatePreviewPosition(host, editor)
}

function onInitPreviewPosition({ host, direction, dragging, table, cell, draggingIndex }: OnInitParams): void {
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
}
