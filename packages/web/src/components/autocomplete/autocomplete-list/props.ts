import type { Editor } from '@prosekit/core'

export interface AutocompleteListProps {
  editor: Editor | null
}

export const defaultAutocompleteListProps = {
  editor: null,
} satisfies AutocompleteListProps
