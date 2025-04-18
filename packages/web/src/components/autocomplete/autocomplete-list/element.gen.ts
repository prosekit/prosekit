import { defineCustomElement, registerCustomElement, type BaseElementConstructor } from "@aria-ui/core"

import { useAutocompleteList } from "./setup"
import { autocompleteListEvents, autocompleteListProps, type AutocompleteListEvents, type AutocompleteListProps } from "./types"

const AutocompleteListElementBase: BaseElementConstructor<AutocompleteListProps> = defineCustomElement<
  AutocompleteListProps,
  AutocompleteListEvents
>({
  props: autocompleteListProps,
  events: autocompleteListEvents,
  setup: useAutocompleteList,
})
class AutocompleteListElement extends AutocompleteListElementBase {}

registerCustomElement('prosekit-autocomplete-list', AutocompleteListElement)
  
export { AutocompleteListElement }
