import { defineCustomElement, registerCustomElement } from "@aria-ui/core"

import { useAutocompleteItem } from "./setup"
import { autocompleteItemEvents, autocompleteItemProps, type AutocompleteItemEvents, type AutocompleteItemProps } from "./types"

class AutocompleteItemElement extends defineCustomElement<
  AutocompleteItemProps,
  AutocompleteItemEvents
>({
  props: autocompleteItemProps,
  events: autocompleteItemEvents,
  setup: useAutocompleteItem,
}) {}

registerCustomElement('prosekit-autocomplete-item', AutocompleteItemElement)
  
export { AutocompleteItemElement }
