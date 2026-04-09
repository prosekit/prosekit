import { createContext, type Context, type Signal } from '@aria-ui/core'
import type { ItemFilter } from '@aria-ui/elements/listbox'
import type { OverlayStore } from '@aria-ui/elements/overlay'

/**
 * @internal
 */
export interface AutocompleteStore {
  overlayStore: OverlayStore
  query: Signal<string>
  eventTarget: Signal<EventTarget | null>
  filter: Signal<ItemFilter | null>
}

/**
 * @internal
 */
export const autocompleteStoreContext: Context<AutocompleteStore> = createContext<AutocompleteStore>('prosekit-autocomplete-store')
