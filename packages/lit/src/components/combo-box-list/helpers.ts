import type { ComboBoxList } from './component'

export function isComboBoxList(
  element?: Element | null,
): element is ComboBoxList {
  return element?.tagName?.toLowerCase() === 'prosekit-combo-box-list'
}
