import {
  registerAutocompleteEmptyElement,
  registerAutocompleteItemElement,
  registerAutocompletePopupElement,
  registerAutocompletePositionerElement,
  registerAutocompleteRootElement,
} from '@prosekit/web/autocomplete'

export * from '@prosekit/web/autocomplete'

export {
  AutocompleteEmptyElement as AutocompleteEmpty,
  AutocompleteItemElement as AutocompleteItem,
  AutocompletePopupElement as AutocompletePopup,
  AutocompletePositionerElement as AutocompletePositioner,
  AutocompleteRootElement as AutocompleteRoot,
} from '@prosekit/web/autocomplete'

registerAutocompleteRootElement()
registerAutocompletePositionerElement()
registerAutocompletePopupElement()
registerAutocompleteItemElement()
registerAutocompleteEmptyElement()
