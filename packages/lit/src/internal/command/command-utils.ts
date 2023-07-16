import { type CommandItem } from './command-item'
import { CommandList } from './command-list'

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
