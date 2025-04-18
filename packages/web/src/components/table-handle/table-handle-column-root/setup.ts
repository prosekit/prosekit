import {
  createComputed,
  createSignal,
  useAttribute,
  useEffect,
  type ConnectableElement,
  type SignalState,
} from '@aria-ui/core'
import {
  menuRootProps,
  useMenuRoot,
  type MenuRootProps,
} from '@aria-ui/menu/elements'
import { useOverlayPositionerState } from '@aria-ui/overlay/elements'
import { usePresence } from '@aria-ui/presence'

import { getStateWithDefaults } from '../../../utils/get-default-state'
import { tableHandleRootContext } from '../context'

import type { TableHandleColumnRootProps } from './types'

export function useTableHandleColumnRoot(
  host: ConnectableElement,
  { state }: { state: SignalState<TableHandleColumnRootProps> },
): void {
  const { editor, ...overlayState } = state

  const rootContext = tableHandleRootContext.consume(host)

  const colFirstCellPos = createComputed<number | undefined>(() => {
    return rootContext.get()?.colFirstCellPos
  })

  const referenceCell = createComputed<HTMLElement | null>(() => {
    const pos = colFirstCellPos.get()
    const view = editor.get()?.view
    if (!pos || !view) return null
    return view.nodeDOM(pos) as HTMLElement | null
  })

  const contentOpen = createSignal(false)

  // Close the menu when the hovering element is changed
  // TODO: add a delay
  useEffect(host, () => {
    colFirstCellPos.get()
    contentOpen.set(false)
  })

  useOverlayPositionerState(host, overlayState, {
    reference: referenceCell,
  })

  const presence = createComputed(() => !!referenceCell.get())
  useAttribute(host, 'data-state', () => (presence.get() ? 'open' : 'closed'))
  usePresence(host, presence)

  const menuRootState: SignalState<MenuRootProps> = getStateWithDefaults(
    { open: contentOpen },
    menuRootProps,
  )

  useMenuRoot(host, {
    state: menuRootState,
    emit: () => void 0,
  })
}
