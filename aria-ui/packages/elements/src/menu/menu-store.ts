import { createContext, createSignal, type Context } from '@aria-ui-v2/core'
import { Collection } from '@aria-ui-v2/utils'

import type { OverlayStore } from '../overlay/overlay-store.ts'


/**
 * @internal
 */
export interface MenuStore  {
  overlayStore: OverlayStore
  getParentStore(): MenuStore | undefined
  getActiveValue(): string | null
  setActiveValue(value: string | null): void
  getCollection(): Collection
  setCollection(collection: Collection): void
}



/**
 * @internal
 */
export function createMenuStore(overlayStore: OverlayStore, getParentStore?: () => MenuStore | undefined): MenuStore {
  const activeValue = createSignal<string | null>(null)
  const collection = createSignal<Collection>(new Collection([]))

  return {
    overlayStore, 
    getParentStore: getParentStore || (() => undefined),
    getActiveValue: activeValue.get,
    setActiveValue: activeValue.set,
    getCollection: collection.get,
    setCollection: collection.set,
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
  store.overlayStore.requestOpenChange(false)
  const parentStore = store.getParentStore()
  if (parentStore) {
    closeMenuTree(parentStore)
  }
}


