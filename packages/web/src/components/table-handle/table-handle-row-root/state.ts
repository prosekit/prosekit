import {
  type ConnectableElement,
  createComputed,
  createSignal,
  mapSignals,
  type SignalState,
  useAttribute,
  useEffect,
} from '@aria-ui/core'
import { defaultMenuRootProps, useMenuRoot } from '@aria-ui/menu'
import { useOverlayPositionerState } from '@aria-ui/overlay'
import { usePresence } from '@aria-ui/presence'

import { tableHandleRootContext } from '../context'

import type { TableHandleRowRootProps } from './props'

export function useTableHandleRowRoot(
  host: ConnectableElement,
  state: SignalState<TableHandleRowRootProps>,
) {
  const { editor, ...overlayState } = state

  const rootContext = tableHandleRootContext.consume(host)

  const rowFirstCellPos = createComputed<number | undefined>(() => {
    return rootContext.get()?.rowFirstCellPos
  })

  const referenceCell = createComputed<HTMLElement | null>(() => {
    const pos = rowFirstCellPos.get()
    const view = editor.get()?.view
    if (!pos || !view) return null
    return view.nodeDOM(pos) as HTMLElement | null
  })

  const contentOpen = createSignal(false)

  // Close the menu when the hovering element is changed
  // TODO: add a delay
  useEffect(host, () => {
    referenceCell.get()
    contentOpen.set(false)
  })

  useOverlayPositionerState(host, overlayState, {
    reference: referenceCell,
  })

  const presence = createComputed(() => !!referenceCell.get())
  useAttribute(host, 'data-state', () => (presence.get() ? 'open' : 'closed'))
  usePresence(host, presence)

  useMenuRoot(host, {
    ...mapSignals(defaultMenuRootProps),
    open: contentOpen,
  })
}
