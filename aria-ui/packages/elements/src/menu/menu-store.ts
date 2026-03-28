import { createContext, createSignal, type Context, type Signal } from '@aria-ui-v2/core'
import { Collection } from '@aria-ui-v2/utils'

import { OverlayStore } from '../overlay/overlay-store.ts'

/**
 * @internal
 */
export class MenuStore extends OverlayStore {
  readonly activeValue: Signal<string | null>
  readonly collection: Signal<Collection>
  parentStore: MenuStore | null

  constructor(
    getOpen: () => boolean,
    emitOpenChange: (open: boolean) => void,
  ) {
    super(getOpen, emitOpenChange)
    this.activeValue = createSignal<string | null>(null)
    this.collection = createSignal(new Collection([]))
    this.parentStore = null
  }
}

/**
 * @internal
 */
export const MenuStoreContext: Context<MenuStore> = createContext<MenuStore>('MenuStoreContext')

/**
 * @internal
 */
export function closeMenuTree(store: MenuStore): void {
  let current: MenuStore | null = store
  while (current?.parentStore) {
    current = current.parentStore
  }
  current?.emitOpenChange(false)
}
