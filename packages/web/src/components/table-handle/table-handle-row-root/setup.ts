import {
  createComputed,
  createSignal,
  defineEmit,
  useAttribute,
  useEffect,
  type ConnectableElement,
  type SetupOptions,
} from '@aria-ui/core'
import {
  menuRootEvents,
  menuRootProps,
  useMenuRoot,
} from '@aria-ui/menu/elements'
import { useOverlayPositionerState } from '@aria-ui/overlay/elements'
import { usePresence } from '@aria-ui/presence'

import { getStateWithDefaults } from '../../../utils/get-default-state'
import { tableHandleRootContext } from '../context'

import type {
  TableHandleRowRootEvents,
  TableHandleRowRootProps,
} from './types'

export function useTableHandleRowRoot(
  host: ConnectableElement,
  { state }: SetupOptions<TableHandleRowRootProps, TableHandleRowRootEvents>,
): void {
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
    rowFirstCellPos.get()
    contentOpen.set(false)
  })

  useOverlayPositionerState(host, overlayState, {
    reference: referenceCell,
  })

  const presence = createComputed(() => !!referenceCell.get())
  useAttribute(host, 'data-state', () => (presence.get() ? 'open' : 'closed'))
  usePresence(host, presence)

  const menuRootState = getStateWithDefaults(
    {
      open: contentOpen,
    },
    menuRootProps,
  )

  useMenuRoot(host, {
    state: menuRootState,
    emit: defineEmit(host, menuRootEvents),
  })
}
