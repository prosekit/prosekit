import type { EventDeclarations, PropDeclarations } from '@aria-ui/core'
import { listboxItemEvents, type ListboxItemEvents } from '@aria-ui/listbox'

export interface AutocompleteItemProps {
  /**
   * The value of the item, which will be matched against the query.
   *
   * If not provided, the value is the item's text content.
   *
   * @default ""
   */
  value: string
}

/** @internal */
export const autocompleteItemProps: PropDeclarations<AutocompleteItemProps> = {
  value: {
    default: '',
  },
}

export interface AutocompleteItemEvents extends ListboxItemEvents {}

/** @internal */
export const autocompleteItemEvents: EventDeclarations<AutocompleteItemEvents> = listboxItemEvents
