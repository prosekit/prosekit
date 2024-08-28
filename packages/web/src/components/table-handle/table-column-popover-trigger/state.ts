import {
  useEventListener,
  type ConnectableElement,
  type SignalState,
} from '@aria-ui/core'
import { useMenuTrigger } from '@aria-ui/menu'

import { tableHandleRootContext } from '../context'

import type { TableColumnPopoverTriggerProps } from './props'

export function useTableColumnPopoverTrigger(
  host: ConnectableElement,
  state: SignalState<TableColumnPopoverTriggerProps>,
) {
  useMenuTrigger(host)

  const context = tableHandleRootContext.consume(host)

  useEventListener(host, 'pointerdown', () => {
    const editor = state.editor.get()
    if (!editor) return
    const { cellAxis } = context.get()
    if (!cellAxis) return
    editor.commands.selectTableColumn({ head: cellAxis.$cell.pos })
  })
}
