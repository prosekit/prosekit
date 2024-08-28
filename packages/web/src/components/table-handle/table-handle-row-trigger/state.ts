import {
  useEventListener,
  type ConnectableElement,
  type SignalState,
} from '@aria-ui/core'
import { useMenuTrigger } from '@aria-ui/menu'
import { selectTableRow } from '@prosekit/extensions/table'

import { tableHandleRootContext } from '../context'

import type { TableHandleRowTriggerProps } from './props'

export function useTableHandleRowTrigger(
  host: ConnectableElement,
  state: SignalState<TableHandleRowTriggerProps>,
) {
  useMenuTrigger(host)

  const context = tableHandleRootContext.consume(host)

  useEventListener(host, 'pointerdown', () => {
    const editor = state.editor.peek()
    const cellPos = context.peek()?.cellPos
    if (!editor || !cellPos) return
    editor.exec(selectTableRow({ head: cellPos }))
  })
}
