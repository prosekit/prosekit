import {
  useEffect,
  type ConnectableElement,
  type SignalState,
} from '@aria-ui/core'
import { useListboxItem } from '@aria-ui/listbox'

import { openContext } from '../context'

import type { AutocompleteItemProps } from './props'

export function useAutocompleteItem(
  element: ConnectableElement,
  props?: Partial<AutocompleteItemProps>,
): SignalState<AutocompleteItemProps> {
  const { onSelect, value } = useListboxItem(element, props)

  const open = openContext.consume(element)

  useEffect(element, () => {
    // Check the text content again when the open state changes
    if (!value.peek() && open.get()) {
      value.set(element.textContent ?? '')
    }
  })

  return { onSelect, value }
}
