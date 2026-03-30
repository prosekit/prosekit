import { useEffect, type ConnectableElement, type SignalState } from '@aria-ui/core'

import { assignStyles } from '../../../utils/assign-styles.ts'
import { useInitDndPosition, type OnInitParams } from '../dnd.ts'

import type { TableHandleDropIndicatorProps } from './types.ts'
import { useUpdateIndicatorPosition } from './updater.ts'

const HANDLE_WIDTH = 2

/**
 * @internal
 */
export function useTableHandleDropIndicator(
  host: ConnectableElement,
  { state }: { state: SignalState<TableHandleDropIndicatorProps> },
): void {
  const { editor } = state

  useEffect(host, () => {
    assignStyles(host, {
      pointerEvents: 'none',
      position: 'absolute',
    })
  })

  useInitDndPosition(host, editor, onInitIndicatorPosition)

  useUpdateIndicatorPosition(host, editor, HANDLE_WIDTH)
}

function onInitIndicatorPosition({ host, direction, dragging, table }: OnInitParams): void {
  assignStyles(host, {
    display: dragging ? 'block' : 'none',
  })

  const tableRect = table.getBoundingClientRect()

  if (direction === 'col') {
    assignStyles(host, {
      width: `${HANDLE_WIDTH}px`,
      height: `${tableRect.height}px`,
    })
  }

  if (direction === 'row') {
    assignStyles(host, {
      width: `${tableRect.width}px`,
      height: `${HANDLE_WIDTH}px`,
    })
  }
}
