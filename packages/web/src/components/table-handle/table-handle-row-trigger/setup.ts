import {
  useEventListener,
  type ConnectableElement,
  type SetupOptions,
} from '@aria-ui/core'
import { useMenuTrigger } from '@aria-ui/menu/elements'
import { selectTableRow } from '@prosekit/extensions/table'

import { tableHandleRootContext } from '../context'

import type {
  TableHandleRowTriggerEvents,
  TableHandleRowTriggerProps,
} from './types'

export function useTableHandleRowTrigger(
  host: ConnectableElement,
  {
    state,
  }: SetupOptions<TableHandleRowTriggerProps, TableHandleRowTriggerEvents>,
): void {
  useMenuTrigger(host)

  const context = tableHandleRootContext.consume(host)

  useEventListener(host, 'pointerdown', () => {
    const editor = state.editor.peek()
    const cellPos = context.peek()?.cellPos
    if (!editor || !cellPos) return
    editor.exec(selectTableRow({ head: cellPos }))
  })
}
