import type { ConnectableElement } from '@aria-ui/core'
import { useListboxEmpty } from '@aria-ui/listbox'

export function useAutocompleteEmpty(element: ConnectableElement): void {
  useListboxEmpty(element)
}
