import {
  useEffect,
  useEventListener,
  type ConnectableElement,
  type SetupOptions,
} from '@aria-ui/core'
import { useListboxItem } from '@aria-ui/listbox/elements'

import { openContext } from '../context'

import type {
  AutocompleteItemEvents,
  AutocompleteItemProps,
} from './types'

export function useAutocompleteItem(
  element: ConnectableElement,
  { state, emit }: SetupOptions<AutocompleteItemProps, AutocompleteItemEvents>,
): void {
  useListboxItem(element, { state, emit })

  const open = openContext.consume(element)

  useEffect(element, () => {
    // Check the text content again when the open state changes
    if (!state.value.peek() && open.get()) {
      state.value.set(element.textContent ?? '')
    }
  })

  useEventListener(element, 'pointerdown', (event) => {
    // Prevent the editor from losing focus
    event.preventDefault()
  })
}
