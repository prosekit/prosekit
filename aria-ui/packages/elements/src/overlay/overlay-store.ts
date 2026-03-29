import { createSignal } from '@aria-ui-v2/core'
import type { ReferenceElement } from '@floating-ui/dom'

/**
 * @internal
 */
export class OverlayStore {
  readonly anchorElement = createSignal<ReferenceElement | undefined>(undefined)

  private positionerId = createSignal<string>('')

  private popupId = createSignal<string>('')

  constructor(
    readonly getOpen: () => boolean,
    readonly emitOpenChange: (open: boolean) => void,
  ) {}

  getPositionerId(): string {
    return this.positionerId.get()
  }

  setPositionerId(id: string): void {
    this.positionerId.set(id)
  }

  getPopupId(): string {
    return this.popupId.get()
  }

  setPopupId(id: string): void {
    this.popupId.set(id)
  }
}
