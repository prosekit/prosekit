import type { AutocompleteItem } from './component'

export function isAutocompleteItem(
  element?: Element | null,
): element is AutocompleteItem {
  return element?.tagName?.toLowerCase() === 'prosekit-autocomplete-item'
}
