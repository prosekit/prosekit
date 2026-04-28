/**

@module

## Anatomy

```html
<prosekit-autocomplete-root>
  <prosekit-autocomplete-positioner>
    <prosekit-autocomplete-popup>
      <prosekit-autocomplete-item>...</prosekit-autocomplete-item>
      <prosekit-autocomplete-empty>...</prosekit-autocomplete-empty>
    </prosekit-autocomplete-popup>
  </prosekit-autocomplete-positioner>
</prosekit-autocomplete-root>
```
*/

export {
  AutocompleteEmptyElement,
  AutocompleteEmptyPropsDeclaration,
  registerAutocompleteEmptyElement,
  setupAutocompleteEmpty,
  type AutocompleteEmptyProps,
} from './autocomplete-empty.ts'

export {
  AutocompleteItemElement,
  AutocompleteItemPropsDeclaration,
  registerAutocompleteItemElement,
  SelectEvent,
  setupAutocompleteItem,
  type AutocompleteItemEvents,
  type AutocompleteItemProps,
} from './autocomplete-item.ts'

export {
  AutocompletePopupElement,
  AutocompletePopupPropsDeclaration,
  registerAutocompletePopupElement,
  setupAutocompletePopup,
  type AutocompletePopupEvents,
  type AutocompletePopupProps,
} from './autocomplete-popup.ts'

export {
  AutocompletePositionerElement,
  AutocompletePositionerPropsDeclaration,
  registerAutocompletePositionerElement,
  setupAutocompletePositioner,
  type AutocompletePositionerProps,
} from './autocomplete-positioner.ts'

export {
  AutocompleteRootElement,
  AutocompleteRootPropsDeclaration,
  OpenChangeEvent,
  QueryChangeEvent,
  registerAutocompleteRootElement,
  setupAutocompleteRoot,
  type AutocompleteRootEvents,
  type AutocompleteRootProps,
} from './autocomplete-root.ts'

export { ValueChangeEvent, ValuesChangeEvent } from '@aria-ui/elements/listbox'
