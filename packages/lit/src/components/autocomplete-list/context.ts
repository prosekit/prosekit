import { createContext } from '@lit/context'

export interface AutocompleteListContext {
  scores: Map<string, number>
  selectedValue: string
  selectedReason: 'mouse' | 'keyboard'
}

// TODO: rename it
export const commandListContext = createContext<AutocompleteListContext>(
  'prosekit-autocomplete-list-context',
)
