import type { ConnectableElement, SignalState } from '@aria-ui/core'
import { useEffect } from '@aria-ui/core'
import { useListboxItem } from '@aria-ui/listbox'

import { openContext } from '../context'

import type { AutocompleteItemProps } from './props'

export function useAutocompleteItem(
  element: ConnectableElement,
  state: SignalState<AutocompleteItemProps>,
): void {
  useListboxItem(element, state)

  const open = openContext.consume(element)

  useEffect(element, () => {
    // Check the text content again when the open state changes
    if (!state.value.peek() && open.get()) {
      state.value.set(element.textContent ?? '')
    }
  })
}
