import type {
  EventDeclarations,
  PropDeclarations,
} from '@aria-ui/core'
import {
  listboxEvents,
  listboxProps,
  type ListboxEvents,
  type ListboxProps,
} from '@aria-ui/listbox'
import type { Editor } from '@prosekit/core'

export interface AutocompleteListProps extends Pick<ListboxProps, 'filter'> {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   * @hidden
   */
  editor: Editor | null
}

export const autocompleteListProps: PropDeclarations<AutocompleteListProps> = {
  filter: listboxProps.filter,
  editor: { default: null },
}

export interface AutocompleteListEvents extends ListboxEvents {}

export const autocompleteListEvents: EventDeclarations<AutocompleteListEvents> = { ...listboxEvents }
