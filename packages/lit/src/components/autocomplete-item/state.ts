import {
  useEffect,
  type ConnectableElement,
  type SignalState,
} from '@aria-ui/core'
import { useListboxItem } from '@aria-ui/listbox'

import type { AutocompleteItemProps } from './props'

export function useAutocompleteItem(
  element: ConnectableElement,
  props?: Partial<AutocompleteItemProps>,
): SignalState<AutocompleteItemProps> {
  const { onSelect, value } = useListboxItem(element, props)

  useEffect(element, () => {
    if (!value.peek()) {
      value.value = element.textContent ?? ''
    }
  })

  return { onSelect, value }
}
