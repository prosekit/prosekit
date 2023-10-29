import { createContext } from '@lit/context'

export interface AutocompleteListContext {
  scores: Map<string, number>
  selectedValue: string
}

export const commandListContext = createContext<AutocompleteListContext>(
  'prosekit-autocomplete-list-context',
)
