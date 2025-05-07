import {
  useEventListener,
  type ConnectableElement,
  type SignalState,
} from '@aria-ui/core'
import { useMenuTrigger } from '@aria-ui/menu/elements'
import { selectTableColumn } from '@prosekit/extensions/table'

import { tableHandleRootContext } from '../context'

import type { TableHandleColumnTriggerProps } from './types'

export function useTableHandleColumnTrigger(
  host: ConnectableElement,
  { state }: { state: SignalState<TableHandleColumnTriggerProps> },
): void {
  useMenuTrigger(host)

  const context = tableHandleRootContext.consume(host)

  useEventListener(host, 'pointerdown', () => {
    const editor = state.editor.peek()
    const cellPos = context.peek()?.cellPos
    if (!editor || !cellPos) return
    editor.exec(selectTableColumn({ head: cellPos }))
  })
}
