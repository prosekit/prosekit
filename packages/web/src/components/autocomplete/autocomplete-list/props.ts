import { defaultListboxProps, type ListboxProps } from '@aria-ui/listbox'
import type { Editor } from '@prosekit/core'

export interface AutocompleteListProps extends Pick<ListboxProps, 'filter'> {
  editor: Editor | null
}

export const defaultAutocompleteListProps = {
  filter: defaultListboxProps.filter,
  editor: null,
} satisfies AutocompleteListProps
