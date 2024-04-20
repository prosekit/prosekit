import { defaultAutocompleteItemProps, type AutocompleteItemProps } from '@prosekit/primitives/autocomplete'

import { createComponent } from '../create-component'

export const AutocompleteItem = createComponent<AutocompleteItemProps>('prosekit-autocomplete-item', 'AutocompleteItem', defaultAutocompleteItemProps)
