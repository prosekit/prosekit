import type { ComboBoxItem } from './component'

export function isComboBoxItem(
  element?: Element | null,
): element is ComboBoxItem {
  return element?.tagName?.toLowerCase() === 'prosekit-combo-box-item'
}

export function queryClosestComboBoxItem(
  element?: Element | null,
): ComboBoxItem | null {
  if (!element) {
    return null
  }
  if (isComboBoxItem(element)) {
    return element
  }
  const item = element.closest('prosekit-combo-box-item')
  if (isComboBoxItem(item)) {
    return item
  }
  return null
}
