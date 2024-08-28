import {
  useEventListener,
  type ConnectableElement,
  type SignalState,
} from '@aria-ui/core'
import { useMenuTrigger } from '@aria-ui/menu'

import { tableHandleRootContext } from '../context'

import type { TableRowPopoverTriggerProps } from './props'

export function useTableRowPopoverTrigger(
  host: ConnectableElement,
  state: SignalState<TableRowPopoverTriggerProps>,
) {
  useMenuTrigger(host)

  const context = tableHandleRootContext.consume(host)

  useEventListener(host, 'pointerdown', () => {
    const editor = state.editor.get()
    if (!editor) return
    const { cellAxis } = context.get()
    if (!cellAxis) return
    editor.commands.selectTableRow({ head: cellAxis.$cell.pos })
  })
}
