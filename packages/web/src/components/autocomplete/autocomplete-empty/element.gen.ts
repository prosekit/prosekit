import { defineCustomElement, registerCustomElement } from "@aria-ui/core"

import { useAutocompleteEmpty } from "./setup"
import { autocompleteEmptyEvents, autocompleteEmptyProps, type AutocompleteEmptyEvents, type AutocompleteEmptyProps } from "./types"

class AutocompleteEmptyElement extends defineCustomElement<
  AutocompleteEmptyProps,
  AutocompleteEmptyEvents
>({
  props: autocompleteEmptyProps,
  events: autocompleteEmptyEvents,
  setup: useAutocompleteEmpty,
}) {}

registerCustomElement('prosekit-autocomplete-empty', AutocompleteEmptyElement)
  
export { AutocompleteEmptyElement }
