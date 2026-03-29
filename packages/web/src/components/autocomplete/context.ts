import { createContext, createSignal, type Context, type Signal } from '@aria-ui-v2/core'

/**
 * @internal
 */
export class AutocompleteStore {
  readonly query: Signal<string> = createSignal('')
  readonly onSubmit: Signal<VoidFunction | null> = createSignal<VoidFunction | null>(null)
  readonly open: Signal<boolean> = createSignal(false)
}

/**
 * @internal
 */
export const autocompleteStoreContext: Context<AutocompleteStore> = createContext<AutocompleteStore>('prosekit-autocomplete-store')
