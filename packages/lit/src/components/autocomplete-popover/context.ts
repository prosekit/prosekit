import { createContext } from '@lit-labs/context'

export type AutocompletePopoverContext = {
  active: boolean
  query: string
  handleDismiss: VoidFunction
  handleSubmit: VoidFunction
}

export const commandPopoverContext = createContext<AutocompletePopoverContext>(
  'prosekit-autocomplete-popover-context',
)
