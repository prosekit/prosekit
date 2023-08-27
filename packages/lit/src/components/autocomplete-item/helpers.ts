import type { AutocompleteItem } from './component'

export function isAutocompleteItem(
  element?: Element | null,
): element is AutocompleteItem {
  return element?.tagName?.toLowerCase() === 'prosekit-autocomplete-item'
}

export function queryClosestAutocompleteItem(
  element?: Element | null,
): AutocompleteItem | null {
  if (!element) {
    return null
  }
  if (isAutocompleteItem(element)) {
    return element
  }
  const item = element.closest('prosekit-autocomplete-item')
  if (isAutocompleteItem(item)) {
    return item
  }
  return null
}
