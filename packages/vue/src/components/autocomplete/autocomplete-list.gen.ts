import { defaultAutocompleteListProps, type AutocompleteListProps } from '@prosekit/web/autocomplete'

import { createComponent } from '../create-component'

export const AutocompleteList = createComponent<AutocompleteListProps>('prosekit-autocomplete-list', 'AutocompleteList', defaultAutocompleteListProps)
