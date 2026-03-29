import { computed, createSignal } from '@aria-ui-v2/core'
import type { ReferenceElement } from '@floating-ui/dom'

import { OpenChangeEvent } from './open-change-event.ts'

export interface OverlayStore {
  getIsOpen(): boolean
  requestOpenChange(open: boolean): void
  requestOpenToggle(): void
  getPositionerId(): string
  setPositionerId(id: string): void
  getPopupId(): string
  setPopupId(id: string): void
  getAnchorElement(): ReferenceElement | undefined
  setAnchorElement(element: ReferenceElement | undefined): void
}

export function createOverlayStore(
  getOpen: () => boolean | null,
  setOpen: (open: boolean) => void,
  getDefaultOpen: () => boolean,
  getDisabled: () => boolean,
  dispatchOpenChangeEvent: (event: OpenChangeEvent) => void,
): OverlayStore {
  const anchorElement = createSignal<ReferenceElement | undefined>(undefined)
  const positionerId = createSignal<string>('')
  const popupId = createSignal<string>('')

  const getIsOpen = computed((): boolean => {
    const canOpen = !getDisabled() && anchorElement.get()
    const openValue = getOpen() ?? getDefaultOpen()
    return canOpen ? openValue : false
  })

  const requestOpenChange = (open: boolean) => {
    if (getDisabled()) return
    const event = new OpenChangeEvent(open)
    dispatchOpenChangeEvent(event)
    if (event.defaultPrevented) return
    setOpen(open)
  }

  const requestOpenToggle = () => {
    requestOpenChange(!getIsOpen())
  }

  return {
    getIsOpen,
    requestOpenChange,
    requestOpenToggle,
    getPositionerId: positionerId.get,
    setPositionerId: positionerId.set,
    getPopupId: popupId.get,
    setPopupId: popupId.set,
    getAnchorElement: anchorElement.get,
    setAnchorElement: anchorElement.set,
  }
}
