import {
  useEffect,
  type ConnectableElement,
  type SignalState,
} from '@aria-ui/core'

import {
  useInitDndPosition,
  type OnInitParams,
} from '../dnd'

import type { TableHandleDragIndicatorProps } from './types'
import { useUpdateIndicatorPosition } from './updater'
import { useDrop } from './use-drop'

const HANDLE_WIDTH = 2

/**
 * @internal
 */
export function useTableHandleDragIndicator(host: ConnectableElement, { state }: { state: SignalState<TableHandleDragIndicatorProps> }): void {
  const { editor } = state

  useEffect(host, () => {
    Object.assign(host.style, {
      pointerEvents: 'none',
      position: 'absolute',
    })
  })

  useInitDndPosition(host, editor, onInitIndicatorPosition)

  useUpdateIndicatorPosition(host, editor, HANDLE_WIDTH)

  useDrop(host, editor)
}

function onInitIndicatorPosition({ host, direction, dragging, table }: OnInitParams): void {
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
}
