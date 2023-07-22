import { createContext } from '@lit-labs/context'

export type AutocompleteListContext = {
  scores: Map<string, number>
  selectedValue: string
  registerValue: (value: string) => VoidFunction
}

export const commandListContext = createContext<AutocompleteListContext>(
  'prosekit-autocomplete-list-context',
)
