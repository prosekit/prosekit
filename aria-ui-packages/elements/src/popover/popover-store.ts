import { createContext, createSignal } from '@aria-ui-v2/core'

/**
 * @internal
 */
export class PopoverStore {
  readonly anchorElement = createSignal<HTMLElement | undefined>(undefined)

  private positionerId = createSignal<string>('')

  private popupId = createSignal<string>('')

  constructor(
    readonly getOpen: () => boolean,
    readonly emitOpenChange: (open: boolean) => void,
  ) {
  }

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

/**
 * @internal
 */
export const PopoverStoreContext = createContext<PopoverStore>(
  'PopoverStoreContext',
)
