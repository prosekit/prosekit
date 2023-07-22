import '@prosekit/lit/components/autocomplete-item'

import type { AutocompleteItemProps as AutocompleteItemElementProps } from '@prosekit/lit/components/autocomplete-item'
import { defineComponent, h } from 'vue'

export type AutocompleteItemProps = {
  class?: string,
} & AutocompleteItemElementProps

export const AutocompleteItem = defineComponent<AutocompleteItemProps>(
  (props, { slots }) => {
    return () => h('prosekit-autocomplete-item', props, slots.default?.())
  }
)
