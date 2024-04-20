import type { ConnectableElement, SignalState } from '@aria-ui/core'
import { useListboxEmpty } from '@aria-ui/listbox'

import type { AutocompleteEmptyProps } from './props'

export function useAutocompleteEmpty(
  element: ConnectableElement,
  _props?: Partial<AutocompleteEmptyProps>,
): SignalState<AutocompleteEmptyProps> {
  useListboxEmpty(element)
  return {}
}
