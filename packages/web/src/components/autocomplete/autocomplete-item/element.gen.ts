import { defineCustomElement, registerCustomElement, type BaseElementConstructor } from "@aria-ui/core"

import { useAutocompleteItem } from "./setup"
import { autocompleteItemEvents, autocompleteItemProps, type AutocompleteItemEvents, type AutocompleteItemProps } from "./types"

const AutocompleteItemElementBase: BaseElementConstructor<AutocompleteItemProps> = defineCustomElement<
  AutocompleteItemProps,
  AutocompleteItemEvents
>({
  props: autocompleteItemProps,
  events: autocompleteItemEvents,
  setup: useAutocompleteItem,
})
class AutocompleteItemElement extends AutocompleteItemElementBase {}

registerCustomElement('prosekit-autocomplete-item', AutocompleteItemElement)
  
export { AutocompleteItemElement }
