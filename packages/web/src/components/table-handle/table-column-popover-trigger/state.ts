import {
  useEventListener,
  type ConnectableElement,
  type SignalState,
} from '@aria-ui/core'
import { useMenuTrigger } from '@aria-ui/menu'

import { tableColumnPopoverContext } from '../context'

import type { TableColumnPopoverTriggerProps } from './props'

export function useTableColumnPopoverTrigger(
  host: ConnectableElement,
  state: SignalState<TableColumnPopoverTriggerProps>,
) {
  useMenuTrigger(host)

  const context = tableColumnPopoverContext.consume(host)

  useEventListener(host, 'pointerdown', () => {
    const editor = state.editor.get()
    if (!editor) return
    const { cellAxis, table } = context.get()
    if (!cellAxis || !table) return
    editor.commands.selectTableColumn({ head: cellAxis.$cell.pos })
  })
}
