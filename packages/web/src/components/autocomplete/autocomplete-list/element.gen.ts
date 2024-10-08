import { defineCustomElement, registerCustomElement } from "@aria-ui/core"

import { useAutocompleteList } from "./setup"
import { autocompleteListEvents, autocompleteListProps, type AutocompleteListEvents, type AutocompleteListProps } from "./types"

class AutocompleteListElement extends defineCustomElement<
  AutocompleteListProps,
  AutocompleteListEvents
>({
  props: autocompleteListProps,
  events: autocompleteListEvents,
  setup: useAutocompleteList,
}) {}

registerCustomElement('prosekit-autocomplete-list', AutocompleteListElement)
  
export { AutocompleteListElement }
