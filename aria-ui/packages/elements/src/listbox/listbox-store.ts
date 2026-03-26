import { createContext, createSignal, type Context, type Signal } from '@aria-ui-v2/core'
import { Collection } from '@aria-ui-v2/utils'

export type ItemFilter = (options: { value: string; query: string }) => boolean

export class ListboxStore {
  readonly selectedValues: Signal<string[]>
  readonly activeValue: Signal<string | null>
  readonly multiple: Signal<boolean>
  readonly query: Signal<string>
  readonly filter: Signal<ItemFilter | null>
  readonly emitSelectionChange: (values: string[]) => void
  readonly collection: Signal<Collection>

  constructor(emitSelectionChange: (values: string[]) => void) {
    this.selectedValues = createSignal<string[]>([])
    this.activeValue = createSignal<string | null>(null)
    this.multiple = createSignal(false)
    this.query = createSignal('')
    this.filter = createSignal<ItemFilter | null>(null)
    this.collection = createSignal(new Collection([]))
    this.emitSelectionChange = emitSelectionChange
  }
}

export const ListboxStoreContext: Context<ListboxStore> = createContext<ListboxStore>('ListboxStoreContext')
