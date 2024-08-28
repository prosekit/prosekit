import {
  useEventListener,
  type ConnectableElement,
  type SignalState,
} from '@aria-ui/core'
import { useMenuTrigger } from '@aria-ui/menu'
import { selectTableColumn } from '@prosekit/extensions/table'

import { tableHandleRootContext } from '../context'

import type { TableHandleColumnTriggerProps } from './props'

export function useTableHandleColumnTrigger(
  host: ConnectableElement,
  state: SignalState<TableHandleColumnTriggerProps>,
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
