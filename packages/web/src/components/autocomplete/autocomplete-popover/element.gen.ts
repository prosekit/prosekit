import { defineCustomElement, registerCustomElement } from "@aria-ui/core"

import { useAutocompletePopover } from "./setup"
import { autocompletePopoverEvents, autocompletePopoverProps, type AutocompletePopoverEvents, type AutocompletePopoverProps } from "./types"

class AutocompletePopoverElement extends defineCustomElement<
  AutocompletePopoverProps,
  AutocompletePopoverEvents
>({
  props: autocompletePopoverProps,
  events: autocompletePopoverEvents,
  setup: useAutocompletePopover,
}) {}

registerCustomElement('prosekit-autocomplete-popover', AutocompletePopoverElement)
  
export { AutocompletePopoverElement }
