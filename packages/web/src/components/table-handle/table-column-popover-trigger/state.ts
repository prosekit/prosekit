import {
  useEventListener,
  type ConnectableElement,
  type SignalState,
} from '@aria-ui/core'
import { useMenuTrigger } from '@aria-ui/menu'
import { selectTableColumn } from '@prosekit/extensions/table'

import { tableHandleRootContext } from '../context'

import type { TableColumnPopoverTriggerProps } from './props'

export function useTableColumnPopoverTrigger(
  host: ConnectableElement,
  state: SignalState<TableColumnPopoverTriggerProps>,
) {
  useMenuTrigger(host)

  const context = tableHandleRootContext.consume(host)

  useEventListener(host, 'pointerdown', () => {
    const editor = state.editor.peek()
    const cellPos = context.peek()?.cellPos
    if (!editor || !cellPos) return
    editor.exec(selectTableColumn({ head: cellPos }))
  })
}
