import { defaultListboxProps, type ListboxProps } from '@aria-ui/listbox'
import type { Editor } from '@prosekit/core'

export interface AutocompleteListProps extends Pick<ListboxProps, 'filter'> {
  editor: Editor | null
}

const defaultFilter: (options: { query: string; value: string }) => boolean =
  defaultListboxProps.filter

export const defaultAutocompleteListProps = {
  filter: defaultFilter,
  editor: null,
} satisfies AutocompleteListProps
