import { defineCustomElement, registerCustomElement, type BaseElementConstructor } from "@aria-ui/core"

import { useAutocompletePopover } from "./setup.ts"
import { autocompletePopoverEvents, autocompletePopoverProps, type AutocompletePopoverEvents, type AutocompletePopoverProps } from "./types.ts"

const AutocompletePopoverElementBase: BaseElementConstructor<AutocompletePopoverProps> = defineCustomElement<
  AutocompletePopoverProps,
  AutocompletePopoverEvents
>({
  props: autocompletePopoverProps,
  events: autocompletePopoverEvents,
  setup: useAutocompletePopover,
})
class AutocompletePopoverElement extends AutocompletePopoverElementBase {}

registerCustomElement('prosekit-autocomplete-popover', AutocompletePopoverElement)
  
export { AutocompletePopoverElement }
