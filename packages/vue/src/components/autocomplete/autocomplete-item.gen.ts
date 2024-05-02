import { defaultAutocompleteItemProps, type AutocompleteItemProps } from '@prosekit/web/autocomplete'

import { createComponent } from '../create-component'

export const AutocompleteItem = createComponent<AutocompleteItemProps>('prosekit-autocomplete-item', 'AutocompleteItem', defaultAutocompleteItemProps)
