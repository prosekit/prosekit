import { type CommandItem } from './item'
import { CommandList } from './list'

export function isCommandItem(
  element?: Element | null,
): element is CommandItem {
  return element?.tagName?.toLowerCase() === 'prosekit-command-item'
}

export function isCommandList(
  element?: Element | null,
): element is CommandList {
  return element?.tagName?.toLowerCase() === 'prosekit-command-list'
}
