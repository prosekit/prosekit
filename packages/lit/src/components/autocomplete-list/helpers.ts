import type { AutocompleteList } from './component'

export function isAutocompleteList(
  element?: Element | null,
): element is AutocompleteList {
  return element?.tagName?.toLowerCase() === 'prosekit-autocomplete-list'
}
