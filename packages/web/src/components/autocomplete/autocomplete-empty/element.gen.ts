import { defineCustomElement, registerCustomElement, type BaseElementConstructor } from "@aria-ui/core"

import { useAutocompleteEmpty } from "./setup.ts"
import { autocompleteEmptyEvents, autocompleteEmptyProps, type AutocompleteEmptyEvents, type AutocompleteEmptyProps } from "./types.ts"

const AutocompleteEmptyElementBase: BaseElementConstructor<AutocompleteEmptyProps> = defineCustomElement<
  AutocompleteEmptyProps,
  AutocompleteEmptyEvents
>({
  props: autocompleteEmptyProps,
  events: autocompleteEmptyEvents,
  setup: useAutocompleteEmpty,
})
class AutocompleteEmptyElement extends AutocompleteEmptyElementBase {}

registerCustomElement('prosekit-autocomplete-empty', AutocompleteEmptyElement)
  
export { AutocompleteEmptyElement }
